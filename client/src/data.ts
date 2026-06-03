export interface VersionedId {
  versionStr: string;
  id: string;
}

export interface GenericItem {
  id: string; // The primary unique string ID (e.g. textId)
  versionedIds: VersionedId[];
  numericId: string | null;
  name: string;
  englishName: string;
  tags: string[];
  imageUrl: string;
  imageUrlFallback: string;
  version: number;
  versionString: string;
  extraProps: Record<string, any>; // Store everything else dynamically
}

const TAG_MAP: Record<number, string> = {
  0: '方块',
  1: '物品',
  2: '原版物品',
  3: '仅基岩版',
  4: '仅教育版',
  5: '已移除',
  6: '实体',
  7: '状态效果',
  8: '附魔',
  9: '刷怪蛋',
};

function parseVersion(v: number): string {
  if (v < 200) {
    const major = Math.floor(v / 100);
    const minor = v % 100;
    return `${major}.${minor}`;
  }
  if (v >= 10000) {
    const major = Math.floor(v / 10000);
    const minor = Math.floor((v % 10000) / 100);
    const patch = v % 100;
    return `${major}.${minor}.${patch}`;
  }
  return `其它(${v})`;
}

export async function fetchCategory(category: string): Promise<GenericItem[]> {
  const response = await fetch(`/json/cList.${category}.json`);
  const rawData: any[] = await response.json();
  
  return rawData.map((item) => {
    let rawId = item.id;
    let numericId = item.num ? String(item.num) : null;
    let versionedIds: VersionedId[] = [];

    if (!rawId && item.ID) {
      const idParts = item.ID.split(',');
      const newIdRaw = idParts[idParts.length - 1];
      rawId = newIdRaw.includes('.') ? newIdRaw.split('.')[1] : newIdRaw;
      
      idParts.forEach((part: string) => {
        if (part.startsWith('num.')) {
          numericId = part.substring(4).replace('_', ':');
        } else {
          const dotIdx = part.indexOf('.');
          if (dotIdx > -1) {
            const vNum = parseInt(part.substring(0, dotIdx));
            const idStr = part.substring(dotIdx + 1);
            if (!isNaN(vNum)) {
              versionedIds.push({ versionStr: parseVersion(vNum) + '+', id: idStr });
            } else {
              versionedIds.push({ versionStr: '1.0+', id: part });
            }
          } else {
            versionedIds.push({ versionStr: '1.0+', id: part });
          }
        }
      });
    }
    
    if (!rawId) rawId = 'unknown';

    if (versionedIds.length === 0) {
      const vStr = item.v ? parseVersion(item.v) + '+' : '1.0+';
      versionedIds.push({ versionStr: vStr, id: rawId });
    }

    const tags = item.t ? item.t.split(',').map((t: string) => TAG_MAP[parseInt(t)] || '').filter(Boolean) : [];
    
    let imageUrl = `/img/${rawId}.png`;
    let imageUrlFallback = `/img/${rawId}_i.png`;

    if (category === 'entities') {
      imageUrl = `/img/entities_${rawId}.gif`;
      imageUrlFallback = `/img/entities_${rawId}.png`;
    } else if (category === 'potion') {
      imageUrl = `/img/potion_${rawId}.png`;
      imageUrlFallback = `/img/potion_7.png`;
    } else if (category === 'mobEffect') {
      imageUrl = `/img/mob_effect_${rawId}.png`;
    } else if (category === 'tippedArrow') {
      imageUrl = `/img/tipped_arrow_${rawId}.png`;
      imageUrlFallback = `/img/tipped_arrow_awkward.png`;
    } else if (category === 'enchantedBook') {
      imageUrl = `/img/enchanted_book_nomal.png`;
      imageUrlFallback = `/img/enchanted_book_nomal.png`;
    } else if (category === 'goatHorn') {
      imageUrl = `/img/goat_horn_goat_horn.png`;
      imageUrlFallback = `/img/goat_horn_goat_horn.png`;
    } else if (category === 'banner') {
      const idx = rawData.indexOf(item);
      imageUrl = `/img/banner_${idx}.png`;
    } else if (category === 'painting') {
      imageUrl = `/img/painting_${rawId}.png`;
    } else if (category === 'particle') {
      imageUrl = `/img/particle_${rawId}.png`;
      imageUrlFallback = `/img/particle_${rawId}.gif`;
    } else if (category === 'structure') {
      imageUrl = `/img/show.structure.png`;
      imageUrlFallback = `/img/show.structure.png`;
    } else if (category === 'biome') {
      imageUrl = `/img/show.biome.png`;
      imageUrlFallback = `/img/show.biome.png`;
    } else if (category !== 'BAI') {
        imageUrl = `/img/${category}_${rawId}.png`;
        imageUrlFallback = `/img/${category}_${rawId}_i.png`;
    }

    if (item.dt && category === 'BAI') {
        imageUrl = imageUrl.replace('.png', '.gif');
        imageUrlFallback = imageUrlFallback.replace('.png', '.gif');
    }

    const versionVal = item.v || 0;

    return {
      id: rawId,
      versionedIds,
      numericId,
      name: item.n || item.EN || rawId,
      englishName: item.EN || rawId.replace(/_/g, ' '),
      tags,
      imageUrl,
      imageUrlFallback,
      version: versionVal,
      versionString: versionVal ? parseVersion(versionVal) : '未知',
      extraProps: item
    };
  });
}
