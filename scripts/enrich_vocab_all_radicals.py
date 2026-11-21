#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Enrich all 214 radicals with 10+ vocabulary words per radical.
High-frequency radicals in JLPT exams & daily life receive 15-22 words.
Every vocabulary item has:
- kanji
- hiragana (with romaji)
- sinoVietnamese
- meaning
- level ('N5' | 'N4' | 'N3' | 'N2' | 'N1')
- breakdown
- mnemonic
"""

import json
import os

with open('/tmp/existing_radicals.json', 'r', encoding='utf-8') as f:
    radicals = json.load(f)

print(f"Loaded {len(radicals)} existing radicals.")
