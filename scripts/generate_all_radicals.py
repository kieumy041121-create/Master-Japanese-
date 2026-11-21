#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Full Generator for 214 Radicals Database with 10+ vocabulary words per radical.
High-frequency radicals have 15-22 words.
"""

import json
import os
import sys

print("Loading existing radicals...")
with open('/tmp/existing_radicals.json', 'r', encoding='utf-8') as f:
    radicals = json.load(f)

print(f"Loaded {len(radicals)} radicals.")
