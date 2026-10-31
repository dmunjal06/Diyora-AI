import { useState, useEffect, useRef } from 'react'

const careerSkills = {
  'AI Software Engineer': [
    'Python',
    'JavaScript',
    'Data Structures & Algorithms',
    'SQL',
    'Machine Learning',
    'Git & GitHub',
  ],
  'Software Developer': [
    'Java',
    'JavaScript',
    'Data Structures & Algorithms',
    'SQL',
    'Git & GitHub',
  ],
  'Data Analyst': [
    'Python',
    'SQL',
    'Data Analysis',
    'Statistics',
    'Data Visualization',
  ],
  'UI/UX Designer': [
    'UI Design',
    'UX Research',
    'Wireframing',
    'Prototyping',
  ],
}

const skillOptions = [
  'Java',
  'Python',
  'JavaScript',
  'React.js',
  'SQL',
  'Data Structures & Algorithms',
  'Machine Learning',
  'Data Analysis',
  'Statistics',
  'Data Visualization',
  'Git & GitHub',
  'UI Design',
  'UX Research',
  'Wireframing',
  'Prototyping',
]

function Dashboard({ onLogout }) {
  const [activeView, setActiveView] = useState('overview')
  const [interest, setInterest] = useState('')
  const [strength, setStrength] = useState('')
  const [recommendation, setRecommendation] = useState('')
  const [targetCareer, setTargetCareer] = useState('AI Software Engineer')
  const [currentSkills, setCurrentSkills] = useState([])
  const [skillGapResult, setSkillGapResult] = useState(null)
  const [message, setMessage] = useState('')
  const isFirstRender = useRef(true)
  const skipNextPush = useRef(false)

useEffect(() => {
  if (isFirstRender.current) {
    window.history.replaceState(
      { dashboardView: activeView },
      '',
      '/dashboard'
    )
    isFirstRender.current = false
    return
  }

  if (skipNextPush.current) {
    skipNextPush.current = false
    return
  }

  window.history.pushState(
    { dashboardView: activeView },
    '',
    '/dashboard'
  )
}, [activeView])

useEffect(() => {
  const handlePopState = (event) => {
    skipNextPush.current = true
    setActiveView(event.state?.dashboardView || 'overview')
  }

  window.addEventListener('popstate', handlePopState)

  return () => {
    window.removeEventListener('popstate', handlePopState)
  }
}, [])

  function getRecommendation() {
    if (!interest || !strength) {
      setMessage('Please answer both questions first.')
      return
    }

    const careers = {
      'Software Development': 'Software Developer',
      'Artificial Intelligence': 'AI Software Engineer',
      'Data Analysis': 'Data Analyst',
      'UI/UX Design': 'UI/UX Designer',
    }

    const nextSteps = {
      'Problem-solving': 'Practise DSA and coding problems.',
      Creativity: 'Build projects and prototypes.',
      'Analytical thinking': 'Practise logical reasoning and data analysis.',
      Communication: 'Develop teamwork and technical communication.',
    }

    setRecommendation({
      career: careers[interest],
      nextStep: nextSteps[strength],
    })
    setMessage('')
    setActiveView('recommendations')
  }

  function toggleSkill(skill) {
    setCurrentSkills((previous) =>
      previous.includes(skill)
        ? previous.filter((item) => item !== skill)
        : [...previous, skill]
    )
    setSkillGapResult(null)
  }

  function analyzeSkillGap() {
    const requiredSkills = careerSkills[targetCareer]
    const missingSkills = requiredSkills.filter(
      (skill) => !currentSkills.includes(skill)
    )

    setSkillGapResult({
      requiredSkills,
      missingSkills,
      matchedSkills: requiredSkills.filter(
        (skill) => currentSkills.includes(skill)
      ),
    })
  }

  const navItems = [
    { id: 'overview', icon: '⌂', label: 'Overview' },
    { id: 'assessment', icon: '◎', label: 'Career Assessment' },
    { id: 'recommendations', icon: '✧', label: 'Recommendations' },
    { id: 'skill-gap', icon: '◇', label: 'Skill Gap Analysis' },
  ]

  return (
    <div className="workspace-shell">
      <aside className="workspace-sidebar">
        <button
          className="workspace-brand"
          onClick={() => setActiveView('overview')}
        >
          <span className="brand-mark">D</span>
          <span>
            <strong>Diyora AI</strong>
            <small>Career Architecture</small>
          </span>
        </button>

        <p className="sidebar-label">NAVIGATION</p>

        <nav className="workspace-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={
                activeView === item.id
                  ? 'workspace-nav-item active'
                  : 'workspace-nav-item'
              }
              onClick={() => {
                setActiveView(item.id)
                setMessage('')
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

                <div className="sidebar-note">
          <span className="status-dot" />
          <div>
            <strong>Career workspace</strong>
            <small>Personal learning journey</small>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          ↪ Logout
        </button>
      </aside>

      <main className="workspace-main">
        <header className="workspace-header">
          <div>
            <span className="header-eyebrow">DIYORA AI / WORKSPACE</span>
            <strong>
              {activeView === 'overview'
                ? 'Overview'
                : navItems.find((item) => item.id === activeView)?.label}
            </strong>
          </div>
          <span className="header-pill">Know Your Path. Grow With Purpose.</span>
        </header>

        {activeView === 'overview' && (
          <>
            <section className="workspace-hero">
              <div className="hero-copy">
                <span className="eyebrow-pill">
                  YOUR PERSONAL CAREER WORKSPACE
                </span>
                <h1>
                  Discover your path.
                  <br />
                  <span>Build your future.</span>
                </h1>
                <p>
                  Understand your interests, identify skills to develop,
                  and organise your next steps towards your career goal.
                </p>
                <div className="hero-actions">
                  <button
                    className="primary-button"
                    onClick={() => setActiveView('assessment')}
                  >
                    Start Career Assessment →
                  </button>
                  <button
                    className="secondary-button"
                    onClick={() => setActiveView('skill-gap')}
                  >
                    Explore Skill Gaps
                  </button>
                </div>
              </div>

              <div className="hero-illustration" aria-hidden="true">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="hero-center">D</div>
                <span className="orbit-chip chip-one">Skills</span>
                <span className="orbit-chip chip-two">Goals</span>
                <span className="orbit-chip chip-three">Growth</span>
              </div>
            </section>

            <section className="section-heading">
              <div>
                <span className="section-kicker">YOUR JOURNEY</span>
                <h2>Career development</h2>
              </div>
              <p>Start with an assessment or review your skills.</p>
            </section>

            <section className="workspace-stats">
              <article className="stat-card">
                <span className="stat-icon">◎</span>
                <p>Career assessment</p>
                <strong>{recommendation ? 'Completed' : 'Not started'}</strong>
                <small>Based on your assessment answers</small>
              </article>

              <article className="stat-card">
                <span className="stat-icon">◇</span>
                <p>Skills selected</p>
                <strong>{currentSkills.length}</strong>
                <small>Self-reported skills</small>
              </article>

              <article className="stat-card">
                <span className="stat-icon">✧</span>
                <p>Target career</p>
                <strong className="stat-career">
                  {recommendation?.career || 'Not selected'}
                </strong>
                <small>
                  {recommendation
                    ? 'From your career assessment'
                    : 'Complete the assessment to get a recommendation'}
                </small>
              </article>
            </section>

            <section className="section-heading">
              <div>
                <span className="section-kicker">EXPLORE FEATURES</span>
                <h2>Build your career plan</h2>
              </div>
            </section>

            <section className="feature-grid">
              <button
                className="feature-card"
                onClick={() => setActiveView('assessment')}
              >
                <span className="feature-icon">◎</span>
                <h3>Career Assessment</h3>
                <p>Explore careers that match your interests and strengths.</p>
                <span className="feature-link">Start assessment →</span>
              </button>

              <button
                className="feature-card"
                onClick={() => setActiveView('recommendations')}
              >
                <span className="feature-icon">✧</span>
                <h3>Career Recommendations</h3>
                <p>Review the recommendation generated from your answers.</p>
                <span className="feature-link">View recommendations →</span>
              </button>

              <button
                className="feature-card"
                onClick={() => setActiveView('skill-gap')}
              >
                <span className="feature-icon">◇</span>
                <h3>Skill Gap Analysis</h3>
                <p>Compare your selected skills against a career skill checklist.</p>
                <span className="feature-link">Analyse skills →</span>
              </button>

              <article className="feature-card feature-card-muted">
                <span className="feature-icon">↗</span>
                <h3>Learning Roadmap</h3>
                <p>Your personalised learning roadmap will be integrated next.</p>
                <span className="feature-link">Planned feature</span>
              </article>
            </section>
          </>
        )}

        {activeView === 'assessment' && (
          <section className="content-panel">
            <span className="section-kicker">CAREER DISCOVERY</span>
            <h1>Career Assessment</h1>
            <p className="panel-description">
              Answer these questions to receive a basic career recommendation.
            </p>

            <div className="question-block">
              <h3>1. What type of work interests you most?</h3>
              {[
                'Software Development',
                'Artificial Intelligence',
                'Data Analysis',
                'UI/UX Design',
              ].map((option) => (
                <label className="choice-row" key={option}>
                  <input
                    type="radio"
                    name="interest"
                    value={option}
                    checked={interest === option}
                    onChange={(event) => setInterest(event.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="question-block">
              <h3>2. What is your main strength?</h3>
              {[
                'Problem-solving',
                'Creativity',
                'Analytical thinking',
                'Communication',
              ].map((option) => (
                <label className="choice-row" key={option}>
                  <input
                    type="radio"
                    name="strength"
                    value={option}
                    checked={strength === option}
                    onChange={(event) => setStrength(event.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>

            {message && <p className="inline-message">{message}</p>}

            <div className="panel-actions">
              <button className="primary-button" onClick={getRecommendation}>
                Get Career Recommendation →
              </button>
              <button
                className="secondary-button"
                onClick={() => setActiveView('overview')}
              >
                Back to Overview
              </button>
            </div>
          </section>
        )}

        {activeView === 'recommendations' && (
          <section className="content-panel">
            <span className="section-kicker">CAREER DISCOVERY</span>
            <h1>Career Recommendations</h1>

            {recommendation ? (
              <div className="recommendation-panel">
                <span className="feature-icon">✧</span>
                <h2>{recommendation.career}</h2>
                <p>
                  This is a basic recommendation based on the interests and
                  strength you selected. It is guidance, not a prediction of
                  employment outcomes.
                </p>
                <div className="next-step-box">
                  <strong>Suggested next step</strong>
                  <p>{recommendation.nextStep}</p>
                </div>
                <button
                  className="primary-button"
                  onClick={() => {
                    setTargetCareer(recommendation.career)
                    setSkillGapResult(null)
                    setActiveView('skill-gap')
                  }}
                >
                  Explore Skill Gaps →
                </button>
              </div>
            ) : (
              <div className="empty-state">
                <h3>No recommendation yet</h3>
                <p>Complete the career assessment to generate one.</p>
                <button
                  className="primary-button"
                  onClick={() => setActiveView('assessment')}
                >
                  Start Assessment
                </button>
              </div>
            )}
          </section>
        )}

        {activeView === 'skill-gap' && (
          <section className="content-panel">
            <span className="section-kicker">SKILLS & DEVELOPMENT</span>
            <h1>Skill Gap Analysis</h1>
            <p className="panel-description">
              Select the skills you currently have. This first version compares
              your self-reported skills with a basic career checklist. It does
              not verify proficiency or connect to GitHub yet.
            </p>

            <label className="field-label" htmlFor="target-career">
              Target career
            </label>
            <select
              id="target-career"
              className="career-select"
              value={targetCareer}
              onChange={(event) => {
                setTargetCareer(event.target.value)
                setSkillGapResult(null)
              }}
            >
              {Object.keys(careerSkills).map((career) => (
                <option key={career} value={career}>
                  {career}
                </option>
              ))}
            </select>

            <div className="skills-heading">
              <h3>Your current skills</h3>
              <span>{currentSkills.length} selected</span>
            </div>

            <div className="skills-picker">
              {skillOptions.map((skill) => (
                <label
                  key={skill}
                  className={
                    currentSkills.includes(skill)
                      ? 'skill-option selected'
                      : 'skill-option'
                  }
                >
                  <input
                    type="checkbox"
                    checked={currentSkills.includes(skill)}
                    onChange={() => toggleSkill(skill)}
                  />
                  {skill}
                </label>
              ))}
            </div>

            <div className="panel-actions">
              <button className="primary-button" onClick={analyzeSkillGap}>
                Analyse Skill Gaps →
              </button>
              <button
                className="secondary-button"
                onClick={() => setActiveView('overview')}
              >
                Back to Overview
              </button>
            </div>

            {skillGapResult && (
              <div className="gap-results">
                <h2>Skill checklist results</h2>
                <p className="result-disclaimer">
                  Based only on your selections. These results are not verified
                  proficiency scores.
                </p>

                <div className="result-summary">
                  <div>
                    <span>Skills in checklist</span>
                    <strong>{skillGapResult.requiredSkills.length}</strong>
                  </div>
                  <div>
                    <span>Selected as current skills</span>
                    <strong>{skillGapResult.matchedSkills.length}</strong>
                  </div>
                  <div>
                    <span>Not yet selected</span>
                    <strong>{skillGapResult.missingSkills.length}</strong>
                  </div>
                </div>

                <h3>Skills to review</h3>
                {skillGapResult.missingSkills.length ? (
                  <div className="gap-chip-list">
                    {skillGapResult.missingSkills.map((skill) => (
                      <span className="gap-chip" key={skill}>{skill}</span>
                    ))}
                  </div>
                ) : (
                  <p>
                    You selected all skills in this checklist. This does not
                    establish mastery or professional readiness.
                  </p>
                )}

                <h3>Skills you selected</h3>
                <div className="gap-chip-list">
                  {skillGapResult.matchedSkills.length ? (
                    skillGapResult.matchedSkills.map((skill) => (
                      <span className="matched-chip" key={skill}>{skill}</span>
                    ))
                  ) : (
                    <p>No checklist skills selected yet.</p>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        <footer className="workspace-footer">
          <span>Diyora AI · Know Your Path. Grow With Purpose.</span>
          <span>Career guidance for learning and planning</span>
        </footer>
      </main>
    </div>
  )
}

export default Dashboard
