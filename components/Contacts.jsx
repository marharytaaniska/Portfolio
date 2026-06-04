// Contacts — shared section reused by the home page and the case-detail page.
// Single source of truth so the block stays in sync across the site.
function Contacts() {
  const [copied, setCopied] = React.useState(false);

  function handleCopyEmail() {
    navigator.clipboard.writeText("marharytaaniska@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <section id="Контакты" className="section" style={{ gap: "32px" }}>
      <h2 className="title" style={{ fontWeight: "500", fontSize: "48px" }}>Контакты</h2>
      <div className="contacts-grid">
        <div>
          <p style={{ margin: 0, maxWidth: 730, font: "400 18px/26px var(--font-body)", color: "var(--ink-600)" }}>
            Буду рада обсудить долгосрочное сотрудничество или проектную работу.
            Обычно отвечаю в течение нескольких часов — а в Телеграме ещё быстрее! :)
          </p>
          <p style={{ margin: "24px 0 0", maxWidth: 654, font: "400 16px/24px var(--font-body)", color: "var(--ink-400)" }}>
            *Не рассматриваю проекты в нишах: Scam Crypto, Gambling, Betting, Casino, Adult.
          </p>
          <div className="contacts-buttons">
            <Button accent="primary" href="https://t.me/MiraMaraMur" target="_blank" rel="noopener noreferrer">Написать в Telegram</Button>
            <Button accent="secondary" href="https://wa.me/37529862225" target="_blank" rel="noopener noreferrer">Написать в WhatsApp</Button>
          </div>
        </div>
        <div className="contacts-links">
          <Button accent="text" size="sm" onClick={handleCopyEmail}>{copied ? "Copied!" : "Copy Email"}</Button>
          <Button accent="text" size="sm" href="https://hirehi.ru/resume/SjffLa6Rnz" target="_blank" rel="noopener noreferrer">CV</Button>
          <Button accent="text" size="sm" href="https://www.linkedin.com/in/marharytaaniska/?skipRedirect=true" target="_blank" rel="noopener noreferrer">Linked In</Button>
          <Button accent="text" size="sm" style={{ display: "none" }}>Telegram-канал по дизайну</Button>
          <Button accent="text" size="sm" style={{ display: "none" }}>Threads</Button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Contacts });
