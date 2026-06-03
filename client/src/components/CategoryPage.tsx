import { useState, useEffect, useMemo } from 'react';
import { fetchCategory, type GenericItem } from '../data';
import { useParams } from 'react-router-dom';

const CATEGORY_NAMES: Record<string, string> = {
  'BAI': '方块与物品',
  'entities': '实体与生物',
  'biome': '生物群系',
  'structure': '结构',
  'potion': '药水',
  'banner': '旗帜图案',
  'painting': '画作',
  'particle': '粒子效果',
  'enchantedBook': '附魔书',
  'tippedArrow': '药箭',
  'goatHorn': '山羊角',
  'mobEffect': '状态效果',
};

export default function CategoryPage() {
  const { catId } = useParams<{ catId: string }>();
  const categoryId = catId || 'BAI';
  
  const [items, setItems] = useState<GenericItem[]>([]);
  const [search, setSearch] = useState('');
  const [displayCount, setDisplayCount] = useState(100);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<GenericItem | null>(null);

  useEffect(() => {
    setSearch('');
    setDisplayCount(100);
    setItems([]);
    
    fetchCategory(categoryId).then(data => {
      setItems(data);
    }).catch(e => console.error(`Error loading category ${categoryId}:`, e));
  }, [categoryId]);

  const filteredItems = useMemo(() => {
    let result = items;
    if (!search.trim()) return result;
    const lowerSearch = search.toLowerCase();
    return result.filter(item => 
      item.name.toLowerCase().includes(lowerSearch) ||
      item.englishName.toLowerCase().includes(lowerSearch) ||
      item.id.toLowerCase().includes(lowerSearch) ||
      (item.numericId && item.numericId.includes(lowerSearch))
    );
  }, [items, search]);

  const displayedItems = filteredItems.slice(0, displayCount);

  const handleCopyCommand = (cmd: string, btnId: string) => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopiedId(btnId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleCopy = (id: string) => {
    let prefix = 'minecraft:';
    if (categoryId === 'mobEffect') prefix = '';
    const textToCopy = `${prefix}${id}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const renderModalContent = (item: GenericItem, catId: string) => {
    const extra = item.extraProps || {};
    
    if (catId === 'potion') {
      return (
        <div className="detailed-modal">
          {item.versionedIds[0]?.versionStr !== '未知' && <p><strong>版本：</strong> {item.versionedIds[0]?.versionStr}</p>}
          <p><strong>效果：</strong> {extra.ef || '无效果'}</p>
          {item.numericId && <p><strong>数字ID：</strong> {item.numericId}</p>}
          <p><strong>状态效果ID：</strong> {item.id}</p>
          {extra.from && <p><strong>酿造过程：</strong> {extra.from}</p>}

          <div className="command-section">
            <p>1.20.4及之前的获取指令：</p>
            <div className="command-box">
              <code>/give @s minecraft:potion{'{'}Potion:"minecraft:{item.id}"{'}'} 1</code>
              <button className="copy-cmd-btn" onClick={() => handleCopyCommand(`/give @s minecraft:potion{Potion:"minecraft:${item.id}"} 1`, 'cmd_old')}>
                {copiedId === 'cmd_old' ? '已复制!' : '复制指令'}
              </button>
            </div>
            
            <p>新版本获取指令 (1.20.5+)：</p>
            <div className="command-box">
              <code>/give @s minecraft:potion[potion_contents={'{'}potion:"minecraft:{item.id}"{'}'}] 1</code>
              <button className="copy-cmd-btn" onClick={() => handleCopyCommand(`/give @s minecraft:potion[potion_contents={potion:"minecraft:${item.id}"}] 1`, 'cmd_new')}>
                {copiedId === 'cmd_new' ? '已复制!' : '复制指令'}
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    if (catId === 'biome') {
      return (
        <div className="detailed-modal">
          <p><strong>生物群系：</strong> {item.name}</p>
          {item.numericId && <p><strong>数字ID：</strong> {item.numericId}</p>}
          <p>该分类没有生成指令。</p>
        </div>
      );
    }

    if (catId === 'structure') {
      return (
        <div className="detailed-modal">
          <div className="command-section">
            {item.versionedIds.map((vId, idx) => (
              <div key={idx} className="cmd-group">
                <p>{vId.versionStr} 定位指令：</p>
                <div className="command-box">
                  <code>/locate structure minecraft:{vId.id}</code>
                  <button className="copy-cmd-btn" onClick={() => handleCopyCommand(`/locate structure minecraft:${vId.id}`, `cmd_${idx}`)}>
                    {copiedId === `cmd_${idx}` ? '已复制!' : '复制指令'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (catId === 'enchantedBook') {
      return (
        <div className="detailed-modal">
          {item.versionedIds[0]?.versionStr !== '未知' && <p><strong>版本：</strong> {item.versionedIds[0]?.versionStr}</p>}
          {extra.lvl && <p><strong>最高等级：</strong> {extra.lvl}</p>}
          {extra.to && <p><strong>适用物品：</strong> {extra.to}</p>}
          
          <div className="command-section">
            <p>1.20.4及之前的获取指令：</p>
            <div className="command-box">
              <code>/give @s minecraft:enchanted_book{'{'}StoredEnchantments:[{'{'}id:"minecraft:{item.id}",lvl:{extra.lvl || 1}{'}'}]{'}'} 1</code>
              <button className="copy-cmd-btn" onClick={() => handleCopyCommand(`/give @s minecraft:enchanted_book{StoredEnchantments:[{id:"minecraft:${item.id}",lvl:${extra.lvl || 1}}]} 1`, 'cmd_old')}>
                {copiedId === 'cmd_old' ? '已复制!' : '复制指令'}
              </button>
            </div>
            
            <p>新版本获取指令 (1.20.5+)：</p>
            <div className="command-box">
              <code>/give @s minecraft:enchanted_book[stored_enchantments={'{'}{item.id}:{extra.lvl || 1}{'}'}] 1</code>
              <button className="copy-cmd-btn" onClick={() => handleCopyCommand(`/give @s minecraft:enchanted_book[stored_enchantments={${item.id}:${extra.lvl || 1}}] 1`, 'cmd_new')}>
                {copiedId === 'cmd_new' ? '已复制!' : '复制指令'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (catId === 'tippedArrow') {
      return (
        <div className="detailed-modal">
          <div className="command-section">
            <p>1.20.4及之前的获取指令：</p>
            <div className="command-box">
              <code>/give @s minecraft:tipped_arrow{'{'}Potion:"minecraft:{item.id}"{'}'} 1</code>
              <button className="copy-cmd-btn" onClick={() => handleCopyCommand(`/give @s minecraft:tipped_arrow{Potion:"minecraft:${item.id}"} 1`, 'cmd_old')}>
                {copiedId === 'cmd_old' ? '已复制!' : '复制指令'}
              </button>
            </div>
            
            <p>新版本获取指令 (1.20.5+)：</p>
            <div className="command-box">
              <code>/give @s minecraft:tipped_arrow[potion_contents={'{'}potion:"minecraft:{item.id}"{'}'}] 1</code>
              <button className="copy-cmd-btn" onClick={() => handleCopyCommand(`/give @s minecraft:tipped_arrow[potion_contents={potion:"minecraft:${item.id}"}] 1`, 'cmd_new')}>
                {copiedId === 'cmd_new' ? '已复制!' : '复制指令'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (catId === 'goatHorn') {
      return (
        <div className="detailed-modal">
          <div className="command-section">
            <p>1.20.4及之前的获取指令：</p>
            <div className="command-box">
              <code>/give @s minecraft:goat_horn{'{'}instrument:"minecraft:{item.id}"{'}'} 1</code>
              <button className="copy-cmd-btn" onClick={() => handleCopyCommand(`/give @s minecraft:goat_horn{instrument:"minecraft:${item.id}"} 1`, 'cmd_old')}>
                {copiedId === 'cmd_old' ? '已复制!' : '复制指令'}
              </button>
            </div>
            
            <p>新版本获取指令 (1.20.5+)：</p>
            <div className="command-box">
              <code>/give @s minecraft:goat_horn[instrument="minecraft:{item.id}"] 1</code>
              <button className="copy-cmd-btn" onClick={() => handleCopyCommand(`/give @s minecraft:goat_horn[instrument="minecraft:${item.id}"] 1`, 'cmd_new')}>
                {copiedId === 'cmd_new' ? '已复制!' : '复制指令'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (catId === 'painting') {
      return (
        <div className="detailed-modal">
          {extra.author && <p><strong>作者：</strong> {extra.author}</p>}
          {extra.size && <p><strong>尺寸：</strong> {extra.size}</p>}
          <div className="command-section">
            <p>1.20.4及之前的获取指令：</p>
            <div className="command-box">
              <code>/give @s minecraft:painting{'{'}EntityTag:{'{'}variant:"minecraft:{item.id}"{'}'}{'}'} 1</code>
              <button className="copy-cmd-btn" onClick={() => handleCopyCommand(`/give @s minecraft:painting{EntityTag:{variant:"minecraft:${item.id}"}} 1`, 'cmd_old')}>
                {copiedId === 'cmd_old' ? '已复制!' : '复制指令'}
              </button>
            </div>
            
            <p>新版本获取指令 (1.20.5+)：</p>
            <div className="command-box">
              <code>/give @s minecraft:painting[entity_data={'{'}id:"minecraft:painting",variant:"minecraft:{item.id}"{'}'}] 1</code>
              <button className="copy-cmd-btn" onClick={() => handleCopyCommand(`/give @s minecraft:painting[entity_data={id:"minecraft:painting",variant:"minecraft:${item.id}"}] 1`, 'cmd_new')}>
                {copiedId === 'cmd_new' ? '已复制!' : '复制指令'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (catId === 'mobEffect') {
      return (
        <div className="detailed-modal">
          {extra.e && <p><strong>效果：</strong> {extra.e}</p>}
          {item.numericId && <p><strong>数字ID：</strong> {item.numericId}</p>}
          <div className="command-section">
            <p>获取状态效果指令：</p>
            <div className="command-box">
              <code>/effect give @s minecraft:{item.id}</code>
              <button className="copy-cmd-btn" onClick={() => handleCopyCommand(`/effect give @s minecraft:${item.id}`, 'cmd_old')}>
                {copiedId === 'cmd_old' ? '已复制!' : '复制指令'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Default generic handling for BAI, entities, particle, banner
    return (
      <div className="detailed-modal">
        <div className="command-section">
          {item.versionedIds.map((vId, idx) => {
            let cmd = `/give @s minecraft:${vId.id} 1`;
            if (catId === 'entities') cmd = `/summon minecraft:${vId.id}`;
            if (catId === 'particle') cmd = `/particle minecraft:${vId.id} ~ ~ ~`;
            if (catId === 'banner') cmd = `/give @s minecraft:${vId.id || 'white_banner'} 1`;

            return (
              <div key={idx} className="cmd-group">
                <p>{vId.versionStr} 指令：</p>
                <div className="command-box">
                  <code>{cmd}</code>
                  <button className="copy-cmd-btn" onClick={() => handleCopyCommand(cmd, `cmd_${idx}`)}>
                    {copiedId === `cmd_${idx}` ? '已复制!' : '复制指令'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="page-content">
      <header>
        <div className="filter-section">
          <h2>{CATEGORY_NAMES[categoryId] || categoryId}</h2>
        </div>
        <div className="search-section">
          <svg className="search-icon" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            className="search-input" 
            placeholder={`在 ${CATEGORY_NAMES[categoryId] || categoryId} 中搜索...`}
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setDisplayCount(100);
            }}
          />
        </div>
      </header>

      <main className="main-content">
        <div className="grid-container">
          {displayedItems.map((item, idx) => (
            <div className="item-card" key={`${item.id}-${idx}`} onClick={() => setSelectedItem(item)}>
              <div className="img-container">
                <img 
                  src={item.imageUrl} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.dataset.fallbackApplied) {
                      target.dataset.fallbackApplied = 'true';
                      target.src = item.imageUrlFallback;
                    } else if (!target.dataset.secondFallback) {
                      target.dataset.secondFallback = 'true';
                      target.src = '/favicon.svg';
                    }
                  }} 
                  alt={item.name} 
                  loading="lazy"
                />
              </div>
              <div className="info-container">
                <h3 className="item-name" title={item.name}>{item.name}</h3>
                <p className="item-en-name" title={item.englishName}>{item.englishName}</p>
                
                <div className="id-container">
                  {item.versionedIds.map((vId, vIdx) => (
                    <div className="id-row" key={`${vId.id}-${vIdx}`}>
                      {vId.versionStr !== '未知' && <span className="version-label">{vId.versionStr}</span>}
                      <div className="id-main" onClick={(e) => { e.stopPropagation(); handleCopy(vId.id); }} title="点击复制">
                        <span className="id-text">{categoryId === 'mobEffect' ? '' : 'minecraft:'}{vId.id}</span>
                        <svg className="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          {copiedId === vId.id ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" stroke="var(--primary-color)" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          )}
                        </svg>
                      </div>
                    </div>
                  ))}
                  {item.numericId && (
                    <div className="id-numeric">旧版数字ID: <strong>{item.numericId}</strong></div>
                  )}
                </div>

                <div className="meta-container">
                  {item.tags.length > 0 && (
                    <div className="tags">
                      {item.tags.map((tag, i) => <span key={i} className="tag">{tag}</span>)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {displayCount < filteredItems.length && (
          <div className="load-more">
            <button className="load-more-btn" onClick={() => setDisplayCount(d => d + 100)}>
              加载更多
            </button>
          </div>
        )}
      </main>

      {/* Command Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>✖</button>
            <div className="modal-header">
              <div className="modal-img-container">
                <img 
                  src={selectedItem.imageUrl} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.dataset.fallbackApplied) {
                      target.dataset.fallbackApplied = 'true';
                      target.src = selectedItem.imageUrlFallback;
                    }
                  }} 
                  alt={selectedItem.name} 
                />
              </div>
              <div className="modal-title">
                <h2>{selectedItem.name}</h2>
                <p>{selectedItem.englishName}</p>
              </div>
            </div>
            
            <div className="modal-body">
              {renderModalContent(selectedItem, categoryId)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
