# /// script
# requires-python = ">=3.11"
# dependencies = ["reportlab>=4.4,<5", "pymupdf>=1.26,<2", "pypdf>=5,<7"]
# ///
"""Build the portfolio CV and plain-text application version from one source.

Run with: uv run scripts/build_resume.py
"""

import json
import re
from pathlib import Path
from xml.sax.saxutils import escape

import pymupdf
from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "docs/resume-content.json").read_text())
OUTPUT = ROOT / "public/resume.pdf"
PLAIN = ROOT / "public/resume.txt"
QA = ROOT / "tmp/resume-qa"


def link(label, url):
    return f'<a href="{escape(url, {chr(34): "&quot;"})}" color="#151515">{escape(label)}</a>'


def build():
    styles = {
        "name": ParagraphStyle("Name", fontName="Helvetica-Bold", fontSize=21, leading=24, spaceAfter=2),
        "role": ParagraphStyle("Role", fontName="Helvetica-Bold", fontSize=12, leading=15, spaceAfter=4),
        "contact": ParagraphStyle("Contact", fontName="Helvetica", fontSize=9, leading=11.5, spaceAfter=0),
        "section": ParagraphStyle("Section", fontName="Helvetica-Bold", fontSize=10.5, leading=13, spaceBefore=9, spaceAfter=4, keepWithNext=True),
        "body": ParagraphStyle("Body", fontName="Helvetica", fontSize=10, leading=12.6, spaceAfter=2, alignment=TA_LEFT),
        "entry": ParagraphStyle("Entry", fontName="Helvetica-Bold", fontSize=10, leading=12.6, spaceAfter=1, keepWithNext=True),
        "bullet": ParagraphStyle("Bullet", fontName="Helvetica", fontSize=10, leading=12.6, spaceAfter=1.5, leftIndent=9, firstLineIndent=0, bulletIndent=0),
        "small": ParagraphStyle("Small", fontName="Helvetica", fontSize=9.4, leading=11.7, spaceAfter=1),
    }
    for style in styles.values():
        style.textColor = colors.HexColor("#151515")

    flow, text = [], []

    def para(value, kind="body", plain=None):
        flow.append(Paragraph(value, styles[kind]))
        if plain is not None:
            text.append(plain)

    def section(title):
        para(title, "section", f"\n{title}")

    def bullets(values):
        for value in values:
            flow.append(Paragraph(escape(value), styles["bullet"], bulletText="-"))
            text.append(f"- {value}")

    para(escape(DATA["name"]), "name", DATA["name"])
    para(escape(DATA["title"]), "role", DATA["title"])
    contact = f'{DATA["location"]} | {DATA["phone"]} | {DATA["email"]}'
    para(f'{escape(DATA["location"])} | {link(DATA["phone"], "tel:" + re.sub(r"[^+0-9]", "", DATA["phone"]))} | {link(DATA["email"], "mailto:" + DATA["email"])}', "contact", contact)
    for label, key in [("Portfolio", "portfolio"), ("GitHub", "github"), ("LinkedIn", "linkedin")]:
        display = DATA[key].replace("https://", "").rstrip("/")
        para(f'{label}: {link(display, DATA[key])}', "contact", f'{label}: {DATA[key]}')

    section("SUMMARY")
    para(escape(DATA["summary"]), plain=DATA["summary"])

    section("TECHNICAL SKILLS")
    for label, value in DATA["skills"]:
        para(f"<b>{escape(label)}:</b> {escape(value)}", plain=f"{label}: {value}")

    section("PROFESSIONAL EXPERIENCE")
    for item in DATA["experience"]:
        para(escape(item["title"]), "entry", item["title"])
        value = f'{item["organization"]} | {item["period"]} | {item["location"]}'
        para(escape(value), "small", value)
        bullets(item["bullets"])

    section("PROJECTS")
    for item in DATA["projects"]:
        title = f'{item["name"]} | {item["stack"]}'
        para(f'{link(item["name"] + " (" + item["linkLabel"] + ")", item["link"])} | {escape(item["stack"])}', "entry", title)
        bullets(item["bullets"])
        flow.append(Spacer(1, 2))
        text.append(f'{item["linkLabel"]}: {item["link"]}')

    section("EDUCATION")
    for item in DATA["education"]:
        para(escape(item["program"]), "entry", item["program"])
        value = " | ".join(value for value in [item["institution"], item["period"], item["detail"]] if value)
        para(escape(value), "small", value)
        flow.append(Spacer(1, 2))

    section("CERTIFICATIONS")
    for item in DATA["certifications"]:
        para(f'{link(item["name"], item["link"])} | {escape(item["issuer"])} | {escape(item["date"])}', "small", f'{item["name"]} | {item["issuer"]} | {item["date"]}')

    para(f'<b>Languages:</b> {escape(DATA["languages"])}', "small", f'\nLanguages: {DATA["languages"]}')

    OUTPUT.parent.mkdir(exist_ok=True)
    doc = SimpleDocTemplate(str(OUTPUT), pagesize=A4, topMargin=34, bottomMargin=34, leftMargin=39, rightMargin=39,
                            title=f'{DATA["name"]} - {DATA["title"]}', author=DATA["name"], subject="Full Stack Developer Resume")
    doc.build(flow)
    PLAIN.write_text("\n".join(text) + "\n")
    verify()


def verify():
    QA.mkdir(parents=True, exist_ok=True)
    for previous in QA.glob("page-*.png"):
        previous.unlink()
    pdf = pymupdf.open(OUTPUT)
    parsers = {
        "pymupdf": "\n".join(page.get_text(sort=False) for page in pdf),
        "pypdf": "\n".join(page.extract_text() or "" for page in PdfReader(OUTPUT).pages),
    }
    expected = ["SUMMARY", "TECHNICAL SKILLS", "PROFESSIONAL EXPERIENCE", "PROJECTS", "EDUCATION", "CERTIFICATIONS"]
    required = [DATA["name"], DATA["title"], DATA["email"], "TubeParty", "Linkfolio", "SendBook", "Completed an industry capstone"]
    for name, raw in parsers.items():
        extracted = " ".join(raw.split())
        assert all(value in extracted for value in required), f"Missing text with {name}"
        indices = [extracted.index(value) for value in expected]
        assert indices == sorted(indices), f"Incorrect reading order with {name}"
        assert not re.search(r"phase\s*[12]|phases\s*1|two[- ]semester|two semesters|withdrawn|not completed|tuition|junior", extracted, re.I)
        assert "\x00" not in raw and "\ufffd" not in raw
        (QA / f"extracted-{name}.txt").write_text(raw)
    uris = {link.get("uri", "") for page in pdf for link in page.get_links()}
    expected_links = {DATA["linkedin"], DATA["github"], DATA["portfolio"]} | {item["link"] for item in DATA["certifications"]}
    assert expected_links <= uris, "Missing or incorrect profile/certificate links"
    assert OUTPUT.stat().st_size < 2_500_000
    for index, page in enumerate(pdf):
        assert not page.get_images(), "Resume should contain text, not screenshot content"
        for word in page.get_text("words"):
            assert word[0] >= 30 and word[2] <= page.rect.width - 30
            assert word[1] >= 25 and word[3] <= page.rect.height - 25
        page.get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5)).save(QA / f"page-{index + 1}.png")
    print(f"Built {len(pdf)} page(s), {OUTPUT.stat().st_size:,} bytes; text order and links verified with two PDF parsers.")
    print(f"Visual review required: {QA}")


if __name__ == "__main__":
    build()
