import os
import re
import yaml

base_dir = 'D:\Blog\source\_posts\posts_acm\V2.0'

def get_abbrlink_and_title(md_path):
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # 读取 YAML front-matter
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return None, None
    meta = yaml.safe_load(match.group(1))
    abbrlink = meta.get('abbrlink')
    title = meta.get('title')
    return abbrlink, title

result = []
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.md'):
            path = os.path.join(root, file)
            abbrlink, title = get_abbrlink_and_title(path)
            if abbrlink and title:
                result.append({
                    'title': title.replace('XCPC wiki - ', ''),  # 可选：去掉前缀
                    'url': f'/posts/{abbrlink}.html',
                    'file': path
                })

print(f"找到 {len(result)} 个条目")
# 输出为 JS 可用格式
for item in result:
    print(f"{{ title: '{item['title']}', url: '{item['url']}' }},  // {item['file']}")