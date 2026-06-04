// SideNav — fixed 320px left rail on desktop, horizontal sticky strip on tablet & mobile.
// Layout is fully driven by CSS (.side-rail) so media queries can flip the geometry.
// One item is "active" → label darkens to ink-900 and a small red LiveDot follows it.
function SideNav({ active = "Я", onSelect = () => {} }) {
  const items = ["Я", "Кейсы", "Отзывы", "Бэкграунд", "Опыт", "Контакты"];
  return (
    <aside className="side-rail">
      <nav className="side-rail-nav">
        {items.map((label) => {
          const isActive = label === active;
          return (
            <a
              key={label}
              href={`#${label}`}
              onClick={(e) => { e.preventDefault(); onSelect(label); }}
              className={isActive ? "side-rail-item is-active" : "side-rail-item"}
            >
              {label}
              {isActive && <LiveDot />}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

Object.assign(window, { SideNav });
