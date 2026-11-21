# -*- coding: utf-8 -*-
"""
Generate final src/data/radicals214Database.ts
Combines all 214 radicals with 10 to 22 vocabulary items per radical.
"""
import json
import re

# Load all vocabulary parts
full_vocab_dict = {}

from scripts.radical_data_p1 import RADICAL_VOCABS_P1
for k, v in RADICAL_VOCABS_P1.items():
    full_vocab_dict[int(k)] = v

from scripts.generate_p2 import RADICAL_VOCABS_P2
for k, v in RADICAL_VOCABS_P2.items():
    full_vocab_dict[int(k)] = v

from scripts.radical_dict_66_to_80 import RADICAL_VOCABS_66_80
for k, v in RADICAL_VOCABS_66_80.items():
    full_vocab_dict[int(k)] = v

from scripts.build_81_140 import RADICAL_VOCABS_81_140
for k, v in RADICAL_VOCABS_81_140.items():
    full_vocab_dict[int(k)] = v

from scripts.vocab_86_to_150 import RADICAL_VOCABS_86_150
for k, v in RADICAL_VOCABS_86_150.items():
    full_vocab_dict[int(k)] = v

from scripts.radical_data_101_to_140 import RADICAL_VOCABS_101_TO_140
for k, v in RADICAL_VOCABS_101_TO_140.items():
    full_vocab_dict[int(k)] = v

from scripts.radical_data_141_to_175 import RADICAL_VOCABS_141_TO_175
for k, v in RADICAL_VOCABS_141_TO_175.items():
    full_vocab_dict[int(k)] = v

from scripts.radical_data_176_to_214 import RADICAL_VOCABS_176_TO_214
for k, v in RADICAL_VOCABS_176_TO_214.items():
    full_vocab_dict[int(k)] = v

print(f"Total vocabulary sets loaded: {len(full_vocab_dict)}")
for i in range(1, 215):
    assert i in full_vocab_dict, f"Missing radical {i}"
    assert len(full_vocab_dict[i]) >= 10, f"Radical {i} has only {len(full_vocab_dict[i])} words"

# Load original file to get prefix and suffix, and radical metadata
with open('src/data/radicals214Database.ts', 'r', encoding='utf-8') as f:
    orig = f.read()

idx_start = orig.find('export const RADICALS_214_DATA: RadicalItem[] = [')
idx_end = orig.find('// Helper lọc danh sách bộ thủ theo số nét')

prefix = orig[:idx_start].strip() + "\n\n// Danh sách đầy đủ 214 Bộ Thủ Hán Tự (STT 1 -> 214) với hệ thống từ vựng ứng dụng phong phú (mỗi bộ 10 từ trở lên)\nexport const RADICALS_214_DATA: RadicalItem[] = [\n"
suffix = orig[idx_end:]

data_body = orig[idx_start:idx_end]
items = re.findall(
    r'stt:\s*(\d+),\s*strokeCount:\s*(\d+),\s*radical:\s*[\'\"]([^\'\"]+)[\'\"](?:,\s*variants:\s*(\[[^\]]*\]))?,\s*name:\s*[\'\"]([^\'\"]+)[\'\"](?:,\s*meaning:\s*[\'\"]([^\'\"]+)[\'\"])?,\s*mnemonic:\s*[\'\"]([^\'\"]+)[\'\"]',
    data_body,
    re.DOTALL
)

print(f"Parsed {len(items)} original radical items.")

# Grouping comments by stroke
stroke_groups = {
    1: "// Nhóm 1 nét (Bộ 1 – 6)",
    7: "// Nhóm 2 nét (Bộ 7 – 29)",
    30: "// Nhóm 3 nét (Bộ 30 – 60)",
    61: "// Nhóm 4 nét (Bộ 61 – 94)",
    95: "// Nhóm 5 nét (Bộ 95 – 117)",
    118: "// Nhóm 6 nét (Bộ 118 – 146)",
    147: "// Nhóm 7 nét (Bộ 147 – 166)",
    167: "// Nhóm 8 nét (Bộ 167 – 175)",
    176: "// Nhóm 9 nét (Bộ 176 – 186)",
    187: "// Nhóm 10 nét (Bộ 187 – 194)",
    195: "// Nhóm 11 nét (Bộ 195 – 200)",
    201: "// Nhóm 12 nét (Bộ 201 – 204)",
    205: "// Nhóm 13 nét (Bộ 205 – 208)",
    209: "// Nhóm 14 nét (Bộ 209 – 210)",
    211: "// Nhóm 15 nét (Bộ 211)",
    212: "// Nhóm 16 nét (Bộ 212 – 213)",
    214: "// Nhóm 17 nét (Bộ 214)"
}

out_chunks = [prefix]

for idx, (stt_raw, strokes_raw, rad, variants_raw, name, meaning, mnemonic) in enumerate(items, 1):
    stt = idx # accurately 1 to 214, fixes the duplicate 105 at index 205!
    strokes = int(strokes_raw)
    
    if stt in stroke_groups:
        out_chunks.append(f"  {stroke_groups[stt]}\n")
    
    out_chunks.append("  {\n")
    out_chunks.append(f"    stt: {stt},\n")
    out_chunks.append(f"    strokeCount: {strokes},\n")
    out_chunks.append(f"    radical: '{rad}',\n")
    
    if variants_raw and variants_raw.strip():
        # parse variants list
        try:
            var_list = eval(variants_raw)
            var_formatted = ", ".join(f"'{v}'" for v in var_list)
            out_chunks.append(f"    variants: [{var_formatted}],\n")
        except:
            out_chunks.append(f"    variants: {variants_raw.strip()},\n")
            
    out_chunks.append(f"    name: '{name}',\n")
    out_chunks.append(f"    meaning: '{meaning}',\n")
    out_chunks.append(f"    mnemonic: '{mnemonic}',\n")
    
    # Related vocabulary
    vocab_list = full_vocab_dict[stt]
    out_chunks.append("    relatedVocab: [\n")
    for v_idx, v in enumerate(vocab_list):
        kanji = v.get("kanji", "").replace("'", "\\'")
        hiragana = v.get("hiragana", "").replace("'", "\\'")
        sino = v.get("sinoVietnamese", "").replace("'", "\\'")
        mean = v.get("meaning", "").replace("'", "\\'")
        lvl = v.get("level", "N3")
        bd = v.get("breakdown", "").replace("'", "\\'")
        mn = v.get("mnemonic", "").replace("'", "\\'")
        
        comma = "," if v_idx < len(vocab_list) - 1 else ""
        out_chunks.append(
            f"      {{ kanji: '{kanji}', hiragana: '{hiragana}', sinoVietnamese: '{sino}', "
            f"meaning: '{mean}', level: '{lvl}', breakdown: '{bd}', mnemonic: '{mn}' }}{comma}\n"
        )
    out_chunks.append("    ]\n")
    
    comma = "," if stt < 214 else ""
    out_chunks.append(f"  }}{comma}\n")

out_chunks.append("];\n\n")
out_chunks.append(suffix)

final_ts = "".join(out_chunks)

with open('src/data/radicals214Database.ts', 'w', encoding='utf-8') as f:
    f.write(final_ts)

print("Successfully written final src/data/radicals214Database.ts!")
print(f"File size: {len(final_ts)} bytes ({len(final_ts) / 1024 / 1024:.2f} MB)")
