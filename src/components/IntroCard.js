const IntroCard = ({ title, description = "" }) => {
  const lines = description.split("\n").map(s => s.trim()).filter(Boolean)
  const isHeading = s => s.length > 0 && s.length <= 60 && s === s.toUpperCase()

  return (
    <section className="intro-card">
      <div className="intro-head">
        <h3 className="intro-label">Giới thiệu</h3>
        <div className="intro-line" />
      </div>
      <h4 className="intro-event-name">{title}</h4>
      {/* <div className="intro-body">
        {lines.map((line, i) =>
          isHeading(line)
            ? <h5 key={i} className="intro-subtitle">{line}</h5>
            : <p key={i} className="intro-p">{line}</p>
        )}
      </div> */}
      {/* Render HTML từ Froala */}
      <div
        className="intro-body froala-content"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </section>
  )
}

export default IntroCard
