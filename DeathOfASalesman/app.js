const characters = [
  {
    name: "Willy Loman",
    role: "Protagonist, tragic center, and psychological engine",
    tags: ["recognition", "illusion", "fatherhood", "market value"],
    note:
      "Willy is both sympathetic and deeply flawed. He wants proof that his life mattered, but he pursues dignity through public success, sales performance, and Biff's imagined greatness. His tragedy is his inability to separate human worth from being admired, useful, and economically productive.",
  },
  {
    name: "Biff Loman",
    role: "Truth-teller and emotional counterweight",
    tags: ["truth", "Boston", "freedom", "ordinary life"],
    note:
      "Biff wants freedom from the false identity Willy created for him, but he still wants his father's love. His final insight rejects exceptional destiny: ordinariness is not worthlessness, but the possible beginning of an honest life.",
  },
  {
    name: "Happy Loman",
    role: "The dream that continues",
    tags: ["denial", "status", "masculinity", "repetition"],
    note:
      "Happy is essential because he preserves Willy's values after Willy's death. He performs confidence and ambition, but his life substitutes sex for intimacy, promotion fantasies for purpose, and image for identity.",
  },
  {
    name: "Linda Loman",
    role: "Moral witness and protector",
    tags: ["attention", "loyalty", "domestic labor", "dignity"],
    note:
      "Linda insists that Willy matters because he is human, not because he is profitable. Her loyalty is morally powerful, but also limited: she can love Willy and defend him, yet she cannot save him from the dreams and systems consuming him.",
  },
  {
    name: "Charley",
    role: "Practical moral alternative",
    tags: ["realism", "quiet care", "humility", "friendship"],
    note:
      "Charley is practical where Willy is romantic and generous where Willy is proud. He complicates the social critique because he succeeds in the same world, but through steadiness, humility, and action-based compassion.",
  },
  {
    name: "Bernard",
    role: "Biff's childhood foil",
    tags: ["discipline", "consequence", "achievement", "Boston question"],
    note:
      "Bernard disproves Willy's theory that popularity is enough. His adult success shows that confidence without responsibility collapses, and his Boston question exposes the hidden trauma behind Biff's failure.",
  },
  {
    name: "Ben",
    role: "Mythic success figure",
    tags: ["risk", "diamonds", "conquest", "fantasy"],
    note:
      "Ben is less a realistic character than a symbolic force inside Willy's imagination. He represents success as sudden, masculine, dangerous, and morally thin; by the end, that logic helps Willy frame suicide as opportunity.",
  },
  {
    name: "Howard Wagner",
    role: "Modern corporate indifference",
    tags: ["business", "technology", "disposability", "age"],
    note:
      "Howard's cruelty is casual and bureaucratic. His recording machine matters because he listens to mechanical voices while ignoring Willy's living voice, making corporate dehumanization visible on stage.",
  },
  {
    name: "The Woman",
    role: "Admiration, betrayal, and guilt",
    tags: ["Boston", "stockings", "validation", "trauma"],
    note:
      "The Woman validates Willy's insecure masculinity, but the affair destroys Biff's image of his father. Through the stockings, private betrayal becomes tied to money, domestic sacrifice, and Linda's unpaid care.",
  },
  {
    name: "Dave Singleman",
    role: "The ideal salesman myth",
    tags: ["legacy", "salesmanship", "funeral", "false model"],
    note:
      "Dave never appears, but he gives Willy a professional myth to chase: a salesman loved and remembered by customers. Willy's small funeral reveals the gap between that dream and reality.",
  },
  {
    name: "Minor Figures",
    role: "Pressure points in public scenes",
    tags: ["Stanley", "Jenny", "Miss Forsythe", "Letta"],
    note:
      "Stanley shows practical kindness during the restaurant scene; Jenny frames Charley's office as adult competence; Miss Forsythe and Letta expose Happy's shallow performance and the sons' abandonment of responsibility.",
  },
];

const quotes = [
  {
    character: "Willy",
    location: "Act I, opening",
    theme: "Exhaustion",
    moment: "Willy says he is exhausted almost to the point of death.",
    context: "He returns home after failing to complete his sales trip; his body and mind are already beyond ordinary tiredness.",
    analysis:
      "The play begins near the breaking point rather than tracing a fall from strength. Willy's exhaustion is physical, professional, and existential.",
    essayUse: "Tragedy, aging, mental collapse, the body under capitalism.",
  },
  {
    character: "Willy",
    location: "Act I, opening",
    theme: "Professional Identity",
    moment: "Willy admits that he could not continue driving.",
    context: "He tells Linda that he lost focus on the road and could not safely make the trip.",
    analysis:
      "Driving is tied to Willy's job and masculine independence. His inability to drive foreshadows the collapse of the traveling-salesman identity and his death by car.",
    essayUse: "Foreshadowing, symbolism, collapse of work identity.",
  },
  {
    character: "Willy",
    location: "Act I, teenage memory",
    theme: "False Success",
    moment: "Willy teaches the boys that social approval is the key to success.",
    context: "He tells Biff and Happy that being admired will take them farther than study or discipline.",
    analysis:
      "This is the false foundation of Willy's parenting. He turns personality into destiny, teaching Biff that image can replace work.",
    essayUse: "American Dream, parenting, charisma-based success.",
  },
  {
    character: "Willy",
    location: "Act II, Howard's office",
    theme: "Capitalism",
    moment: "Willy reminds Howard of his long service and past importance.",
    context: "He tries to prove that his history with the company should earn loyalty and security.",
    analysis:
      "The scene exposes the gap between Willy's belief in personal loyalty and the company's impersonal logic. The past has no value unless Willy remains profitable.",
    essayUse: "Business indifference, age, dehumanization.",
  },
  {
    character: "Willy",
    location: "Act II, final night",
    theme: "Death as Value",
    moment: "Willy imagines his death creating value for Biff.",
    context: "He calculates that suicide will produce insurance money and admiration.",
    analysis:
      "This is the darkest expression of internalized capitalism. Willy sees his life and death in financial terms; suicide becomes his final attempt to sell himself.",
    essayUse: "Tragedy, capitalism, commodification of human life.",
  },
  {
    character: "Biff",
    location: "Act I, upstairs",
    theme: "Divided Identity",
    moment: "Biff admits he does not know what he is supposed to want.",
    context: "He feels dissatisfied no matter where he works or what he does.",
    analysis:
      "Biff is split between two value systems: outdoor work feels honest, but he judges himself by business success because Willy taught him to.",
    essayUse: "Identity conflict, American Dream, nature versus business.",
  },
  {
    character: "Biff",
    location: "Act II, after Oliver's office",
    theme: "Recognition",
    moment: "Biff realizes that his memory of Oliver and his own importance was false.",
    context: "Oliver barely remembers him, forcing Biff to see that the family inflated the past.",
    analysis:
      "This is Biff's major recognition scene before confronting Willy. He sees that fantasy is not only Willy's problem; he has participated in it too.",
    essayUse: "Illusion versus reality, self-knowledge.",
  },
  {
    character: "Biff",
    location: "Act II, final confrontation",
    theme: "Truth",
    moment: "Biff says the family has never been truthful.",
    context: "He accuses the household of living through exaggeration, pretense, and denial.",
    analysis:
      "Biff diagnoses lying as the family's emotional structure. In a household organized around denial, truth-telling becomes a radical act.",
    essayUse: "Truth, family systems, moral awakening.",
  },
  {
    character: "Biff",
    location: "Act II, final confrontation",
    theme: "Ordinariness",
    moment: "\"I'm a dime a dozen.\"",
    context: "Biff rejects the fantasy of exceptional destiny and applies the same ordinary status to Willy.",
    analysis:
      "This is not self-hatred. Biff is rejecting inflated identity and trying to free both himself and Willy from the need to be extraordinary.",
    essayUse: "Biff's final insight, critique of success ideology.",
  },
  {
    character: "Biff",
    location: "Act II, Boston memory",
    theme: "Betrayal",
    moment: "\"You fake!\"",
    context: "Biff discovers Willy with The Woman and attacks the false image Willy created.",
    analysis:
      "The word attacks more than the affair; it attacks Willy's entire identity as a moral authority. Boston becomes the emotional origin of Biff's adult disillusionment.",
    essayUse: "Turning point, trauma, father-son conflict.",
  },
  {
    character: "Biff",
    location: "Requiem",
    theme: "Wrong Dream",
    moment: "\"He had the wrong dreams.\"",
    context: "Biff judges Willy's life after the funeral.",
    analysis:
      "Biff does not deny Willy's humanity. He argues that Willy's dream was misdirected and mismatched to the life that might have suited him.",
    essayUse: "American Dream, tragic misrecognition, ending.",
  },
  {
    character: "Linda",
    location: "Act I, confrontation with sons",
    theme: "Dignity",
    moment: "Linda insists Willy is human and must not be dismissed.",
    context: "She tells Biff and Happy that failure and exhaustion do not make Willy disposable.",
    analysis:
      "Linda gives the play its ethical center. She demands that ordinary suffering receive tragic seriousness.",
    essayUse: "Modern tragedy, ordinary dignity, social invisibility.",
  },
  {
    character: "Linda",
    location: "Act I, same speech",
    theme: "Attention",
    moment: "\"Attention must be paid.\"",
    context: "Linda demands serious moral recognition for Willy's suffering.",
    analysis:
      "The line expands tragedy beyond powerful people. It asks the audience to recognize the pain of overlooked workers and family members.",
    essayUse: "Tragedy of the common person, dignity, ethics.",
  },
  {
    character: "Linda",
    location: "Act I, household finances",
    theme: "Domestic Reality",
    moment: "Linda calmly lists repair payments and debts.",
    context: "She knows the practical details of the family's economic struggle.",
    analysis:
      "Linda's domestic accounting contrasts with Willy's grand fantasies. She lives in the material reality he avoids.",
    essayUse: "Realism, domestic labor, gender.",
  },
  {
    character: "Linda",
    location: "Requiem",
    theme: "Home",
    moment: "Linda says the final payment has been made.",
    context: "The house is finally owned, but Willy is dead.",
    analysis:
      "The dream of ownership is achieved at the moment it loses meaning. Material security arrives as emotional devastation.",
    essayUse: "Irony, home, failed security, American Dream.",
  },
  {
    character: "Happy",
    location: "Act I, upstairs",
    theme: "Performance",
    moment: "Happy focuses on his body, appearance, and status.",
    context: "He seems conventionally successful but admits he is not fulfilled.",
    analysis:
      "Happy proves that conventional success does not guarantee meaning. Unlike Biff, he does not use dissatisfaction to seek truth.",
    essayUse: "Inherited values, shallow masculinity, emptiness.",
  },
  {
    character: "Happy",
    location: "Act II, restaurant",
    theme: "Moral Cowardice",
    moment: "Happy publicly distances himself from Willy.",
    context: "When Willy becomes embarrassing, Happy refuses to claim him clearly.",
    analysis:
      "Happy values image over family loyalty. He treats Willy as disposable in the way the business world does.",
    essayUse: "Hypocrisy, filial failure, repetition of capitalist values.",
  },
  {
    character: "Happy",
    location: "Requiem",
    theme: "Continuation",
    moment: "Happy vows to continue Willy's dream.",
    context: "Instead of learning from Willy's death, he turns it into motivation.",
    analysis:
      "Happy prevents closure. His loyalty is tragic because it is based on misunderstanding; the destructive dream survives through him.",
    essayUse: "Cyclical tragedy, inherited illusion, unresolved ending.",
  },
  {
    character: "Charley",
    location: "Act II, office",
    theme: "Realism",
    moment: "Charley asks why Willy needs universal approval.",
    context: "He challenges Willy's belief that being liked is necessary for worth.",
    analysis:
      "The question strikes at the center of Willy's worldview. Charley offers self-respect without constant admiration.",
    essayUse: "American Dream, social approval, foil analysis.",
  },
  {
    character: "Charley",
    location: "Act II, office",
    theme: "Practical Care",
    moment: "Charley offers Willy a job.",
    context: "He provides practical help even though Willy has insulted him.",
    analysis:
      "Charley's compassion is action-based. Unlike Willy's dreams, Charley's kindness has material usefulness.",
    essayUse: "Friendship, practical morality, pride.",
  },
  {
    character: "Charley",
    location: "Requiem",
    theme: "Compassion",
    moment: "Charley says people should not blame Willy simplistically.",
    context: "He asks the mourners to see Willy within the conditions of his profession and dream.",
    analysis:
      "Charley prevents the audience from reducing Willy to foolishness. He sees that Willy's delusion came from a system that demanded hope as survival.",
    essayUse: "Balanced judgment, tragedy, capitalism.",
  },
  {
    character: "Bernard",
    location: "Act I, teenage memory",
    theme: "Consequence",
    moment: "Bernard warns Biff about academic failure.",
    context: "He repeatedly tries to get Biff to study for math.",
    analysis:
      "Bernard represents consequence. He understands that admiration will not save Biff from institutional requirements.",
    essayUse: "Responsibility versus popularity, foils.",
  },
  {
    character: "Bernard",
    location: "Act II, Charley's office",
    theme: "Hidden Trauma",
    moment: "Bernard asks what happened in Boston.",
    context: "He identifies Biff's trip to Boston as the turning point.",
    analysis:
      "The question pierces Willy's evasions. Biff's failure has an emotional cause, not merely a practical one.",
    essayUse: "Trauma, hidden structure, psychological realism.",
  },
  {
    character: "Ben",
    location: "Act I, memory/fantasy",
    theme: "Mythic Success",
    moment: "Ben tells the story of entering danger and emerging rich.",
    context: "His success story is compressed, mysterious, and almost magical.",
    analysis:
      "Ben removes ordinary labor from success. Wealth appears as the reward for bold masculine adventure.",
    essayUse: "Myth of success, fantasy, capitalist adventure.",
  },
  {
    character: "Ben",
    location: "Act II, late hallucination",
    theme: "Fatal Opportunity",
    moment: "Ben appears connected to Willy's insurance plan.",
    context: "Willy imagines Ben evaluating suicide as a bold opportunity.",
    analysis:
      "Ben becomes the symbolic voice that turns suicide into a business venture. His success logic becomes fatal.",
    essayUse: "Tragic climax, masculinity, death-as-transaction.",
  },
  {
    character: "Howard",
    location: "Act II, Howard's office",
    theme: "Dehumanization",
    moment: "Howard focuses on his recording machine rather than Willy.",
    context: "He enjoys recorded voices while Willy tries to discuss his survival.",
    analysis:
      "The machine symbolizes modernity's replacement of human attention. Howard ignores a living voice while listening to mechanical ones.",
    essayUse: "Technology, dehumanization, business culture.",
  },
  {
    character: "Howard",
    location: "Act II, Howard's office",
    theme: "Corporate Logic",
    moment: "\"Business is business.\"",
    context: "Howard reduces Willy's request to impersonal corporate logic.",
    analysis:
      "The phrase captures cruelty hidden behind practicality. Howard treats his decision as natural, not ethical.",
    essayUse: "Capitalism, moral evasion, labor.",
  },
  {
    character: "The Woman",
    location: "Act II, Boston memory",
    theme: "Stockings",
    moment: "The Woman asks for the stockings.",
    context: "The stockings become evidence of Willy's betrayal of Linda.",
    analysis:
      "The object turns private guilt into visible drama, connecting sex, money, and domestic sacrifice.",
    essayUse: "Symbolism, betrayal, gendered labor.",
  },
  {
    character: "Dave Singleman",
    location: "Act II / Requiem contrast",
    theme: "Salesman Myth",
    moment: "Willy recalls Dave as a salesman who was respected and remembered.",
    context: "Dave becomes Willy's proof that selling can lead to dignity and a meaningful funeral.",
    analysis:
      "Dave is less a person than a professional myth. Willy's small funeral exposes that model as false or unreachable.",
    essayUse: "Professional identity, false ideals, irony.",
  },
];

const themes = [
  {
    title: "The American Dream and Its Distortion",
    body:
      "The play attacks a distorted aspiration based on charm, visibility, and being admired. Willy's dream is not built on craft, discipline, community, or self-knowledge; it turns identity into performance.",
    links: ["Willy", "Biff", "Happy", "Ben"],
  },
  {
    title: "Illusion Versus Reality",
    body:
      "Willy's memories are emotional defenses rather than reliable records. Illusion is also a family system: Linda protects, Happy reshapes, and Biff initially participates before pushing toward truth.",
    links: ["Willy", "Biff", "Linda", "Happy"],
  },
  {
    title: "Fatherhood, Inheritance, and Family Damage",
    body:
      "Willy does not simply love Biff; he needs Biff to validate his own life. Biff challenges the inherited dream, while Happy absorbs and continues it.",
    links: ["Willy", "Biff", "Happy"],
  },
  {
    title: "Capitalism, Labor, and Human Disposability",
    body:
      "Willy gives decades to a company, yet becomes disposable when he is less useful. The deeper tragedy is that Willy internalizes this logic and imagines death as financial value.",
    links: ["Willy", "Howard", "Charley"],
  },
  {
    title: "Masculinity and the Fear of Failure",
    body:
      "The men are pressured to prove themselves through competition, money, sexual conquest, toughness, and public success. Biff's tears matter because they break this performance.",
    links: ["Willy", "Biff", "Happy", "Ben"],
  },
  {
    title: "Home, Ownership, and Entrapment",
    body:
      "The Loman house is both dream and prison. Linda's final focus on the last payment reveals the bitter irony of ownership achieved after Willy is gone.",
    links: ["Linda", "Willy", "Biff"],
  },
  {
    title: "Memory, Guilt, and Time",
    body:
      "The past is not finished. Boston is a buried wound that explains Biff's anger and Willy's guilt, while the idealized past already contains the causes of collapse.",
    links: ["Willy", "Biff", "Bernard", "The Woman"],
  },
  {
    title: "Ordinary Tragedy",
    body:
      "Miller asks the audience to take seriously the suffering of someone without traditional heroic status. Willy is tragic because he struggles for dignity in a world that denies it to economic failure.",
    links: ["Willy", "Linda", "Charley"],
  },
];

const essays = [
  {
    title: "Willy Loman as a Modern Tragic Hero",
    thesis:
      "Willy Loman is a modern tragic hero because his downfall reveals not the fall of a great ruler, but the destruction of an ordinary man whose need for dignity is exploited by a society that measures worth through success.",
    evidence: ["Linda's Act I speech", "Howard scene", "Charley's Requiem speech", "Willy's insurance fantasy"],
  },
  {
    title: "The American Dream as Psychological Trap",
    thesis:
      "In Death of a Salesman, the American Dream becomes tragic when it teaches Willy to confuse visibility with value, causing him to sacrifice truth, family, and life itself for the appearance of success.",
    evidence: ["teenage memories", "Oliver failure", "Ben's success myth", "small funeral"],
  },
  {
    title: "Biff's Truth-Telling as Moral Liberation",
    thesis:
      "Biff's rejection of exceptional destiny is the play's strongest moral alternative to Willy's illusions, but his liberation remains incomplete because it arrives after years of damage and too late to save Willy.",
    evidence: ["Oliver recognition", "\"dime a dozen\"", "final confrontation", "wrong dreams"],
  },
  {
    title: "Linda Loman: Moral Witness or Enabler?",
    thesis:
      "Linda is both the moral witness of the play and a figure trapped by loyalty; her compassion challenges a society that discards Willy, but her protective silence shows the limits of love in a family built on illusion.",
    evidence: ["attention must be paid", "suicide revelations", "stockings motif", "Requiem confusion"],
  },
  {
    title: "The Father-Son Relationship as the Core of the Tragedy",
    thesis:
      "The tragedy of Willy and Biff lies in Willy's inability to love Biff as a separate person; by turning his son into proof of his own worth, Willy makes honest father-son love almost impossible.",
    evidence: ["football memories", "Boston", "restaurant scene", "final embrace"],
  },
  {
    title: "Happy Loman and the Continuation of the False Dream",
    thesis:
      "Happy's final loyalty to Willy is tragic because it is based on misunderstanding: rather than honoring his father by learning from his death, Happy keeps alive the very dream that killed him.",
    evidence: ["workplace exaggeration", "restaurant abandonment", "Requiem vow"],
  },
  {
    title: "Capitalism and the Disposable Worker",
    thesis:
      "Miller presents capitalism not only as an economic system but as a moral language that teaches Willy to view himself as disposable unless he can produce profit.",
    evidence: ["declining sales", "Howard firing", "Charley's money", "insurance fantasy"],
  },
  {
    title: "Memory Structure and Psychological Realism",
    thesis:
      "The fragmented structure transforms Willy's mind into the play's stage, showing that his tragedy is caused not only by present failure but by a past he revises yet cannot escape.",
    evidence: ["memory shifts", "Ben appearances", "Bernard's question", "Boston memory"],
  },
  {
    title: "Symbols of Betrayal: Stockings, Seeds, Cars, and the House",
    thesis:
      "Miller's symbols are powerful because they are ordinary household and work objects; they reveal how economic pressure, guilt, hope, and betrayal are embedded in everyday life.",
    evidence: ["stockings", "seeds", "car", "house payment"],
  },
  {
    title: "Charley and Bernard as Alternatives to Willy's Dream",
    thesis:
      "Charley and Bernard function as quiet alternatives to Willy's worldview, showing that discipline, humility, and practical care are more stable than performance and admiration.",
    evidence: ["Bernard's warnings", "Bernard as lawyer", "Charley's job offer", "Requiem defense"],
  },
];

const symbols = [
  ["Seeds", "Willy's desperate desire to plant a tangible legacy before his life feels wasted."],
  ["Stockings", "Sexual betrayal, economic scarcity, Linda's domestic labor, and Willy's guilt."],
  ["Diamonds", "Sudden wealth, risk, masculine fantasy, and death imagined as value."],
  ["Car", "Work, mobility, masculine independence, danger, and suicide."],
  ["House", "Security, debt, entrapment, delayed ownership, and emotional emptiness."],
  ["Recorder", "Technology, modernity, mechanical voices, and corporate indifference."],
  ["West / Outdoors", "Biff's desire for authenticity outside urban business performance."],
];

const foils = [
  ["Willy / Charley", "romantic fantasy vs. practical realism; pride vs. durable care."],
  ["Biff / Happy", "truth-seeking vs. denial; rejection of the dream vs. continuation."],
  ["Biff / Bernard", "charisma without discipline vs. quiet achievement through habits."],
  ["Willy / Ben", "ordinary insecurity vs. mythic sudden wealth and conquest."],
  ["Linda / The Woman", "domestic sacrifice and loyalty vs. fantasy admiration and betrayal."],
  ["Howard / Charley", "corporate indifference vs. neighborly responsibility."],
];

const planningRows = [
  ["Modern tragedy", "Willy, Linda, Charley", "ordinary tragedy, dignity, failure", "Linda's Act I speech; Howard scene; Requiem"],
  ["American Dream", "Willy, Biff, Happy, Ben", "success, illusion, capitalism", "teenage memories; Oliver failure; Requiem"],
  ["Father-son conflict", "Willy, Biff", "projection, betrayal, truth", "Act I memories; Boston; final confrontation"],
  ["Capitalism", "Willy, Howard, Charley", "labor, disposability, market value", "Howard firing; Charley's office; insurance fantasy"],
  ["Gender / masculinity", "Willy, Biff, Happy, Ben, Linda", "competition, performance, care", "Ben scenes; restaurant; Linda's speeches"],
  ["Symbolism", "Willy, Linda, Biff", "guilt, hope, home, death", "stockings; seeds; car; house payment"],
  ["Memory and trauma", "Willy, Biff, Bernard", "past/present, guilt, denial", "Bernard's question; Boston memory; final night"],
];

let activeQuoteFilter = "All";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

window.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  renderCharacters();
  renderQuoteFilters();
  renderQuotes();
  renderThemes();
  renderEssays();
  renderMiniTable("#symbolTable", symbols);
  renderMiniTable("#foilTable", foils);
  renderPlanningMatrix();
});

function setupTabs() {
  $$(".tab-button").forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.tab));
  });

  $$(".tab-shortcut").forEach((button) => {
    button.addEventListener("click", () => activateTab(button.dataset.jump, true));
  });

  $("#quoteSearch").addEventListener("input", renderQuotes);
}

function activateTab(tabId, scrollToTabs = false) {
  $$(".tab-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabId);
  });
  $$(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });
  if (scrollToTabs) $(".tab-bar").scrollIntoView({ block: "start" });
  $(`.tab-button[data-tab="${tabId}"]`)?.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest",
  });
}

function renderCharacters() {
  $("#characterGrid").innerHTML = characters
    .map(
      (character) => `
        <article class="character-card">
          <strong>${character.name}</strong>
          <span class="role">${character.role}</span>
          <div class="tag-row">${character.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
          <p>${character.note}</p>
        </article>
      `,
    )
    .join("");
}

function renderQuoteFilters() {
  const people = ["All", ...new Set(quotes.map((quote) => quote.character))];
  $("#quoteFilters").innerHTML = people
    .map(
      (person) => `
        <button class="filter-button ${person === activeQuoteFilter ? "active" : ""}" type="button" data-filter="${person}">
          ${person}
        </button>
      `,
    )
    .join("");

  $$(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeQuoteFilter = button.dataset.filter;
      renderQuoteFilters();
      renderQuotes();
    });
  });
}

function renderQuotes() {
  const query = $("#quoteSearch").value.trim().toLowerCase();
  const filtered = quotes.filter((quote) => {
    const matchesFilter = activeQuoteFilter === "All" || quote.character === activeQuoteFilter;
    const haystack = Object.values(quote).join(" ").toLowerCase();
    return matchesFilter && (!query || haystack.includes(query));
  });

  $("#quoteGrid").innerHTML = filtered.length
    ? filtered.map(renderQuoteCard).join("")
    : `<div class="empty-state">No quote study moments match that search yet.</div>`;
}

function renderQuoteCard(quote) {
  return `
    <article class="quote-card">
      <div class="quote-meta">
        <span>${quote.character}</span>
        <span>${quote.location}</span>
        <span>${quote.theme}</span>
      </div>
      <blockquote>${quote.moment}</blockquote>
      <dl class="quote-detail">
        <div>
          <dt>Context</dt>
          <dd>${quote.context}</dd>
        </div>
        <div>
          <dt>Deep Analysis</dt>
          <dd>${quote.analysis}</dd>
        </div>
        <div>
          <dt>Essay Use</dt>
          <dd>${quote.essayUse}</dd>
        </div>
      </dl>
    </article>
  `;
}

function renderThemes() {
  $("#themeGrid").innerHTML = themes
    .map(
      (theme) => `
        <article class="theme-card">
          <h3>${theme.title}</h3>
          <p>${theme.body}</p>
          <div class="tag-row">${theme.links.map((link) => `<span class="tag">${link}</span>`).join("")}</div>
        </article>
      `,
    )
    .join("");
}

function renderEssays() {
  $("#essayList").innerHTML = essays
    .map(
      (essay, index) => `
        <article class="essay-card">
          <h3><span>Topic ${index + 1}</span>${essay.title}</h3>
          <p>${essay.thesis}</p>
          <ul>${essay.evidence.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
      `,
    )
    .join("");
}

function renderMiniTable(selector, rows) {
  $(selector).innerHTML = rows
    .map(
      ([label, detail]) => `
        <div class="mini-row">
          <strong>${label}</strong>
          <span>${detail}</span>
        </div>
      `,
    )
    .join("");
}

function renderPlanningMatrix() {
  const matrix = $("#planningMatrix");
  if (!matrix) return;
  matrix.innerHTML = planningRows
    .map(
      ([focus, characters, themes, scenes]) => `
        <div class="matrix-row">
          <strong>${focus}</strong>
          <span>${characters}</span>
          <span>${themes}</span>
          <span>${scenes}</span>
        </div>
      `,
    )
    .join("");
}
