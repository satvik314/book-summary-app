/**
 * Content model
 * -------------
 * categories[] -> books[] -> slides[5] + deepDive[3]
 *
 * Every slide carries one interaction. The five interaction types are
 * rendered by src/components/Interaction.jsx:
 *   quiz      – pick an answer, get feedback
 *   flip      – tap cards to turn them over
 *   slider    – drag through a range of labelled stops
 *   steps     – reveal a sequence one beat at a time
 *   checklist – tick items off, get a closing note
 */

export const categories = [
  {
    id: 'mind',
    name: 'Mind & Habits',
    tagline: 'How thinking and behaviour actually work',
    glyph: '✦',
    books: [
      {
        id: 'atomic-habits',
        title: 'Atomic Habits',
        author: 'James Clear',
        year: 2018,
        minutes: 7,
        spine: 'Small changes, remarkable results',
        blurb:
          'Behaviour change is not a willpower problem. It is a systems problem — and systems are built one tiny, repeatable unit at a time.',
        slides: [
          {
            kicker: 'The premise',
            title: 'Habits are compound interest',
            body: [
              'A single habit, done once, is almost meaningless. Reading ten pages tonight will not make you well read. Skipping the gym once will not make you unfit.',
              'The unit of change is invisible. The result of change is not. Habits multiply against themselves, so the gap between "slightly better" and "slightly worse" widens quietly for months and then all at once.',
            ],
            pullQuote:
              'You do not rise to the level of your goals. You fall to the level of your systems.',
            interaction: {
              type: 'slider',
              prompt: 'Drag to move through a year of 1% choices.',
              stops: [
                { label: 'Day 1', text: '1% better = 1.01. 1% worse = 0.99. The two are indistinguishable. This is why nobody quits on day one — and why nobody notices day one either.' },
                { label: 'Day 30', text: 'Better: 1.35×. Worse: 0.74×. Roughly a 60% spread has opened up, and it still feels like nothing. This is the valley where most habits die.' },
                { label: 'Day 90', text: 'Better: 2.45×. Worse: 0.40×. You are now six times apart from the version of you who chose otherwise. The first visible evidence usually shows up here.' },
                { label: 'Day 180', text: 'Better: 6.0×. Worse: 0.16×. Outsiders start calling it talent. They are looking at the curve, not the choices.' },
                { label: 'Day 365', text: 'Better: 37.8×. Worse: 0.03×. Same person, same year, same 24 hours a day. The only variable was the direction of the tiny choice.' },
              ],
            },
          },
          {
            kicker: 'The lever',
            title: 'Change identity, not outcomes',
            body: [
              'There are three layers of change: outcomes (what you get), processes (what you do), and identity (what you believe about yourself).',
              'Most people start at the outcome and work inward. Lasting habits run the other way — every action is a vote for the type of person you believe you are. The goal is not to run a marathon; the goal is to become a runner.',
            ],
            interaction: {
              type: 'quiz',
              prompt: 'Which of these is an identity-based habit?',
              options: [
                {
                  label: '"I want to lose 20 pounds by summer."',
                  correct: false,
                  feedback:
                    'Outcome-based. It has an expiry date — and on the day you hit it, the system that got you there loses its reason to exist.',
                },
                {
                  label: '"I am the kind of person who does not miss workouts."',
                  correct: true,
                  feedback:
                    'Identity-based. There is nothing to finish, so there is nothing to relapse from. Each session is evidence, not effort.',
                },
                {
                  label: '"I will go to the gym five times a week this month."',
                  correct: false,
                  feedback:
                    'Process-based — better than an outcome, but still borrowed motivation. It survives a bad week only if the identity underneath it does.',
                },
              ],
            },
          },
          {
            kicker: 'The mechanism',
            title: 'Four laws of behaviour change',
            body: [
              'Every habit runs the same loop: cue → craving → response → reward. Break the loop anywhere and the habit stops.',
              'So there are exactly four levers, and each one inverts to break a bad habit. Tap each card to see the lever and its inversion.',
            ],
            interaction: {
              type: 'flip',
              prompt: 'Tap each law to turn the card over.',
              cards: [
                { front: '1st Law · Cue', back: 'Make it obvious. Put the guitar in the living room. To break: make it invisible — the phone charges in another room.' },
                { front: '2nd Law · Craving', back: 'Make it attractive. Pair it with something you already want. To break: reframe it — list what the habit actually costs you.' },
                { front: '3rd Law · Response', back: 'Make it easy. Reduce friction to under two minutes of effort. To break: add friction — cancel the subscription, delete the app.' },
                { front: '4th Law · Reward', back: 'Make it satisfying. Close the loop immediately — mark the calendar. To break: make it unsatisfying — a witness, a cost, a public commitment.' },
              ],
            },
          },
          {
            kicker: 'The method',
            title: 'Stack it, shrink it, start it',
            body: [
              'Motivation is unreliable, so design around it. Two techniques do most of the work: habit stacking (attaching the new habit to something already automatic) and the two-minute rule (shrinking the habit until refusing it feels absurd).',
              'Walk through building one.',
            ],
            interaction: {
              type: 'steps',
              prompt: 'Reveal the build, one beat at a time.',
              steps: [
                { title: 'Find the anchor', text: 'Name something you already do without fail — pouring the first coffee, closing the laptop, brushing your teeth. That reliability is the asset.' },
                { title: 'Write the stack', text: '"After I [anchor], I will [new habit]." The anchor supplies the cue so you never have to remember.' },
                { title: 'Shrink to two minutes', text: '"Read before bed" becomes "read one page." "Do yoga" becomes "take out the mat." You are mastering showing up, not the outcome.' },
                { title: 'Make the environment do the reminding', text: 'Leave the book on the pillow. The best cue is not discipline; it is a thing sitting where you cannot miss it.' },
                { title: 'Close the loop', text: 'Mark it the moment it is done. The mark is the reward — and the chain of marks becomes the thing you protect.' },
              ],
            },
          },
          {
            kicker: 'The long game',
            title: 'Never miss twice',
            body: [
              'Progress is not linear. Results lag effort by weeks or months — the "plateau of latent potential" — and the gap between what you deserve and what you get is where most people quit.',
              'Missing once is an accident. Missing twice is the start of a new habit. The rule that survives real life is not perfection; it is a fast return.',
            ],
            pullQuote:
              'Every action you take is a vote for the type of person you wish to become.',
            interaction: {
              type: 'checklist',
              prompt: 'Design one atomic habit before you close the book.',
              items: [
                'Name the identity: "I am the kind of person who ______."',
                'Pick the smallest action that casts a vote for it (under two minutes).',
                'Attach it to an anchor you already do daily.',
                'Change one thing in the room so the cue is unmissable.',
                'Choose how you will mark it — and the rule for what happens after a miss.',
              ],
              done: 'That is the whole system. Not a bigger goal — a smaller unit, repeated, with a plan for the day it goes wrong.',
            },
          },
        ],
        deepDive: [
          {
            q: 'Which of your current results are you crediting to talent, when they are actually the output of a system you set up years ago and forgot about?',
            hint: 'Look at something you are good at and trace it backwards to the environment that made it easy.',
            perspective:
              'Clear argues that most "natural" strengths are compounding accidents — a childhood in a house full of books, a friend group that ran, a job that forced daily writing. Naming the system that built a strength tells you how to build the next one deliberately.',
          },
          {
            q: 'Pick a habit you keep failing at. Which of the four laws is actually broken — cue, craving, response, or reward?',
            hint: 'Most failed habits fail at the third law, not the second. It is rarely a wanting problem.',
            perspective:
              'People diagnose habit failure as a motivation problem (2nd law) when it is almost always a friction problem (3rd law). If the answer requires you to want it more, the design is wrong. Change the number of steps between you and the action instead.',
          },
          {
            q: 'What would have to be true about your environment for the good habit to be the path of least resistance?',
            hint: 'Describe the room, the phone, the calendar — not your willpower.',
            perspective:
              'Self-control is a short-term strategy: disciplined people are simply better at structuring their lives so they do not need heroics. The leverage is in the one-time environmental change, not the daily decision.',
          },
        ],
      },
      {
        id: 'thinking-fast-slow',
        title: 'Thinking, Fast and Slow',
        author: 'Daniel Kahneman',
        year: 2011,
        minutes: 9,
        spine: 'The two minds inside one head',
        blurb:
          'A lifetime of research into the shortcuts your mind takes without asking permission — and the predictable ways they go wrong.',
        slides: [
          {
            kicker: 'The cast',
            title: 'System 1 and System 2',
            body: [
              'System 1 is fast, automatic and always on. It reads the word in front of you, hears hostility in a voice, completes "bread and…". It never asks for effort because it never spends any.',
              'System 2 is slow, deliberate and lazy. It multiplies 17 × 24, fills in a tax form, checks an argument. It is the one you experience as "you" — and it endorses most of what System 1 hands it without looking.',
            ],
            interaction: {
              type: 'quiz',
              prompt:
                'A bat and a ball cost $1.10 together. The bat costs $1.00 more than the ball. How much is the ball?',
              options: [
                { label: '10 cents', correct: false, feedback: 'That is System 1 answering — fast, confident, and wrong. If the ball were 10¢, the bat would be $1.10 and the total $1.20. Over half of Harvard, MIT and Princeton students give this answer.' },
                { label: '5 cents', correct: true, feedback: 'Correct — and notice you probably had to overrule the number that appeared first. That override is System 2 doing work it usually declines to do.' },
                { label: '11 cents', correct: false, feedback: 'Not quite — but the interesting part is that a wrong answer arrived before you finished reading. That arrival is the whole point of the puzzle.' },
              ],
            },
          },
          {
            kicker: 'The pull',
            title: 'Anchoring: numbers that stick',
            body: [
              'Any number in the room becomes a starting point, even a number you know is meaningless. Kahneman and Tversky spun a rigged wheel of fortune in front of subjects, then asked what percentage of UN member states were African.',
              'The wheel was random. The answers were not.',
            ],
            interaction: {
              type: 'slider',
              prompt: 'Drag to see how far an irrelevant anchor moves an estimate.',
              stops: [
                { label: 'Wheel lands on 10', text: 'Average estimate of African UN membership: 25%. Everyone knew the wheel was rigged and random. It moved them anyway.' },
                { label: 'Wheel lands on 65', text: 'Average estimate: 45%. Same question, same people, twenty points of difference — supplied entirely by a number they had just watched a wheel produce.' },
                { label: 'In a negotiation', text: 'The first price named sets the range everyone argues inside. This is why "I would rather not go first" is usually the more expensive choice.' },
                { label: 'On a price tag', text: '"Limit 12 per customer" reliably sells more units than no limit at all. The 12 is doing the selling.' },
                { label: 'The defence', text: 'You cannot feel an anchor working. The only reliable counter is to generate your own number, in writing, before you see theirs.' },
              ],
            },
          },
          {
            kicker: 'The shortcuts',
            title: 'Heuristics: the questions you answer instead',
            body: [
              'When a hard question arrives, System 1 quietly swaps it for an easier one and answers that. You experience the substitution as an opinion.',
              'Tap each shortcut to see the swap it performs.',
            ],
            interaction: {
              type: 'flip',
              prompt: 'Tap each heuristic to see the question it really answers.',
              cards: [
                { front: 'Availability', back: 'Asked: how common is this risk? Answered: how easily can I recall an example? Plane crashes make headlines; strokes do not. Vividness beats frequency.' },
                { front: 'Representativeness', back: 'Asked: how likely is this? Answered: how much does it resemble the stereotype? The famous Linda problem: adding "and is a feminist" made people rate her *more* likely to be a bank teller — a logical impossibility.' },
                { front: 'Affect', back: 'Asked: what are the costs and benefits? Answered: how do I feel about it? Like something and you will judge its risks as low and its benefits as high, on no new evidence.' },
                { front: 'WYSIATI', back: '"What You See Is All There Is." Confidence comes from the coherence of the story you can build, not from the amount of evidence behind it. Missing information is simply not represented.' },
              ],
            },
          },
          {
            kicker: 'The asymmetry',
            title: 'Losses loom larger than gains',
            body: [
              'Prospect theory replaced the idea that we evaluate wealth in absolute terms. We evaluate changes — from a reference point — and the curve is steeper on the way down.',
              'Follow the classic demonstration.',
            ],
            interaction: {
              type: 'steps',
              prompt: 'Step through the gamble.',
              steps: [
                { title: 'The offer', text: 'A coin flip: heads you win $150, tails you lose $100. The expected value is +$25. Most people refuse.' },
                { title: 'The exchange rate', text: 'For a typical person, a loss hurts roughly twice as much as an equivalent gain feels good. The $100 loss outweighs the $150 win emotionally, so the bet is declined.' },
                { title: 'The reference point', text: 'Now the same final outcome, framed as a discount you lose rather than a fee you pay. The maths is identical; the answer is not. Framing sets the zero point, and the zero point decides everything.' },
                { title: 'The reversal', text: 'Facing only bad options, people become risk-*seeking*: they will gamble on a small chance of avoiding a loss rather than accept a certain smaller one. It is why losing positions get doubled down on.' },
                { title: 'The consequence', text: 'Endowment effects, sunk costs, status-quo bias and stubborn negotiations are all one asymmetry wearing different clothes.' },
              ],
            },
          },
          {
            kicker: 'The verdict',
            title: 'Experiencing self, remembering self',
            body: [
              'The self that lives through an experience and the self that later judges it are different, and they disagree. Memory is not an average — it is a peak-end summary, almost blind to duration.',
              'Patients undergoing a longer procedure with a milder ending remembered it as less painful than a shorter one that ended at its worst. The remembering self is the one that chooses whether to go back.',
            ],
            pullQuote:
              'Nothing in life is as important as you think it is, while you are thinking about it.',
            interaction: {
              type: 'checklist',
              prompt: 'Guardrails against your own mind.',
              items: [
                'Write your own number before hearing theirs.',
                'For an important decision, take the outside view: what happened to other people who did this?',
                'Run a pre-mortem — "it is a year from now and this failed; why?"',
                'Ask whether your confidence comes from evidence or from a coherent story.',
                'Judge experiences by their peak and their ending, and design endings on purpose.',
              ],
              done: 'Kahneman was blunt that reading his book would not fix his own biases. The realistic win is not self-correction — it is recognising the error in *other* people’s reasoning, and building organisations that catch it.',
            },
          },
        ],
        deepDive: [
          {
            q: 'Recall a decision you were certain about that turned out badly. Was the confidence built on evidence, or on how neatly the story hung together?',
            hint: 'Coherence and quantity of evidence are independent. We only feel the first.',
            perspective:
              'Kahneman calls this WYSIATI: the mind builds the best story available from what it has and does not flag the gaps. Subjective confidence measures the smoothness of the narrative, not its truth — which is why the most confident forecasts are often the least informed ones.',
          },
          {
            q: 'Where in your life are you refusing a good bet because the downside is vivid and the upside is abstract?',
            hint: 'Look for a decision where you can name exactly what you would lose but only vaguely what you would gain.',
            perspective:
              'Loss aversion is adaptive for a single catastrophic risk and expensive when applied to a series of small, independent ones. Kahneman’s advice to executives: evaluate the portfolio of decisions, not each one alone, and a favourable bet becomes obviously worth taking.',
          },
          {
            q: 'Are you optimising your life for the experiencing self or the remembering self — and can you tell which one you have been serving?',
            hint: 'Think about a holiday you would repeat versus a day you would repeat.',
            perspective:
              'The two selves want different things: the experiencing self wants pleasant hours, the remembering self wants a good story. Most people organise their lives around memories they can keep, which explains vacations photographed rather than felt — and why "what would I want to remember?" and "what do I want to feel today?" produce different calendars.',
          },
        ],
      },
    ],
  },
  {
    id: 'business',
    name: 'Business & Innovation',
    tagline: 'Building things that did not exist yesterday',
    glyph: '◆',
    books: [
      {
        id: 'zero-to-one',
        title: 'Zero to One',
        author: 'Peter Thiel',
        year: 2014,
        minutes: 7,
        spine: 'Notes on startups, or how to build the future',
        blurb:
          'A contrarian case against competition: the only businesses worth building are the ones nobody else is building.',
        slides: [
          {
            kicker: 'The distinction',
            title: 'Zero to one, not one to n',
            body: [
              'Horizontal progress is copying things that work: one to n. Globalisation is the macro version — take what works in one place and spread it.',
              'Vertical progress is doing something new: zero to one. Technology is the macro version. Copying is legible and safe; creation is singular and, by definition, has no precedent to point at.',
            ],
            pullQuote:
              'The next Bill Gates will not build an operating system. The next Larry Page will not make a search engine.',
            interaction: {
              type: 'quiz',
              prompt: 'Which of these is a zero-to-one move?',
              options: [
                { label: 'Opening a well-run restaurant in a new city.', correct: false, feedback: 'One to n. Valuable, real work — but the model exists and the returns are competed away by the next person who copies it.' },
                { label: 'Building the first reusable orbital rocket.', correct: true, feedback: 'Zero to one. There was no template, no comparable, and no way to justify it with a spreadsheet of similar companies — which is exactly why it was available.' },
                { label: 'Launching a food delivery app in a market that lacks one.', correct: false, feedback: 'One to n — geographic arbitrage. It can be a good business, but you are racing well-funded copies, not defining a category.' },
              ],
            },
          },
          {
            kicker: 'The heresy',
            title: 'Competition is for losers',
            body: [
              'Perfect competition drives profit to zero. Economists treat it as the ideal; Thiel treats it as the state to escape. A business that has to fight for every customer is a business with nothing left over to build the future with.',
              'So the goal is monopoly — earned by being the only one who does something, not by regulatory capture. Four traits tend to build one. Tap to see each.',
            ],
            interaction: {
              type: 'flip',
              prompt: 'Tap each trait of a durable monopoly.',
              cards: [
                { front: 'Proprietary technology', back: 'Not 10% better — roughly 10× better at something that matters. Incremental improvement is a feature; an order of magnitude is a moat.' },
                { front: 'Network effects', back: 'The product gets better as more people use it — which means it must be valuable to the very first users, when the network does not exist yet. Start absurdly small.' },
                { front: 'Economies of scale', back: 'Costs that do not grow with customers. Software has this natively; a yoga studio does not. Ask whether growth makes each unit cheaper or just busier.' },
                { front: 'Branding', back: 'Real underneath, not instead of. Brand without substance is the last trait every failing company reaches for first.' },
              ],
            },
          },
          {
            kicker: 'The maths',
            title: 'The power law rules everything',
            body: [
              'Venture returns are not normally distributed. A single investment typically returns more than the entire rest of the fund combined — and this is not a quirk of finance, it is the shape of the world.',
              'Drag through what the distribution actually looks like, and what it implies for you.',
            ],
            interaction: {
              type: 'slider',
              prompt: 'Drag through the distribution.',
              stops: [
                { label: 'The naive model', text: 'Spread bets widely; some will work. This feels prudent and reliably produces a portfolio of mediocre outcomes and no winners.' },
                { label: 'What actually happens', text: 'Founders Fund’s best investment returned more than every other investment combined. The second best returned more than all the rest excluding the first. Repeat down the list.' },
                { label: 'The implication for VCs', text: 'Only invest in companies that could plausibly return the entire fund. Because of the shape, there are no "small wins" that matter — a 2× exit is a rounding error.' },
                { label: 'The implication for founders', text: 'The company you start is not diversified. You get one. So the market you choose matters more than almost every decision you will make inside it.' },
                { label: 'The implication for you', text: 'Careers obey it too. Thiel’s uncomfortable corollary: do not build a diversified portfolio of half-commitments. Work out what is most valuable and do that.' },
              ],
            },
          },
          {
            kicker: 'The question',
            title: 'What important truth do very few people agree with you on?',
            body: [
              'Thiel’s interview question is really a test for whether you believe secrets still exist. Most people assume everything valuable has been found — the conventional wisdom of a world that has stopped looking.',
              'Between "easy truths everyone knows" and "impossible mysteries" sits the useful middle: hard truths, findable by people willing to look where others will not.',
            ],
            interaction: {
              type: 'steps',
              prompt: 'How a secret becomes a company.',
              steps: [
                { title: 'Believe secrets exist', text: 'If you think everything worth finding has been found, you will not look — and your beliefs will be correct about you specifically.' },
                { title: 'Look where nobody else does', text: 'Unpopular fields, unfashionable customers, unglamorous problems. Crowded searches have already been run.' },
                { title: 'Answer the contrarian question', text: 'Not "what do people disagree with me about" — anything absurd qualifies — but "what is true and unpopular", which is much harder to hold.' },
                { title: 'Tell the right people', text: 'A secret you tell everyone is no longer a secret; one you tell nobody is a private hallucination. Build a company: the minimum viable conspiracy.' },
                { title: 'Start with a tiny monopoly', text: 'Dominate a small market completely, then expand into adjacent ones. Amazon began with books; Facebook began with one campus.' },
              ],
            },
          },
          {
            kicker: 'The build',
            title: 'Foundations, and the sales you cannot see',
            body: [
              'Thiel’s law: a startup broken at its foundation cannot be fixed later. Equity splits, co-founder relationships and the first ten hires set trajectories that no amount of later success repairs.',
              'And the most common engineering delusion: that a superior product sells itself. Distribution is the product’s twin, and it is invisible precisely when it works.',
            ],
            pullQuote:
              'Every moment in business happens only once. The next Mark Zuckerberg will not build a social network.',
            interaction: {
              type: 'checklist',
              prompt: 'Pressure-test an idea against the seven questions.',
              items: [
                'Engineering: can you create breakthrough technology, not incremental improvement?',
                'Timing: is now the right moment for this particular business?',
                'Monopoly: are you starting with a big share of a small market?',
                'People: do you have the right team — and do they actually get on?',
                'Distribution: do you have a way to deliver it, not just build it?',
                'Durability: will your position survive ten and twenty years from now?',
                'Secret: have you found a unique opportunity others do not see?',
              ],
              done: 'Thiel’s claim is that you need convincing answers to most of these. Companies that answer only one or two are the ones that look fine for three years and then quietly disappear.',
            },
          },
        ],
        deepDive: [
          {
            q: 'What important truth do very few people agree with you on?',
            hint: 'A good answer is uncomfortable to say out loud in a room of peers.',
            perspective:
              'Most answers fail in one of two directions: they are contrarian but false (easy), or true but already popular (safe). The test is whether you can state a belief that would cost you social standing among people whose opinion you value — and still defend it with evidence.',
          },
          {
            q: 'Is the thing you are working on a genuine monopoly in a small market, or a small share of a big one you are describing generously?',
            hint: 'Notice which way you naturally define your market when pitching versus when worrying.',
            perspective:
              'Thiel observes that monopolists disguise themselves by defining their market as huge ("we are in the trillion-dollar transport market") while competitive companies inflate themselves by defining theirs as tiny ("the only farm-to-table Nepalese restaurant in the district"). The direction you exaggerate reveals which one you actually are.',
          },
          {
            q: 'If your product needed no salespeople because it is simply that good — who told you that, and how would you know if it were false?',
            hint: 'Count how many hours this month went into distribution versus building.',
            perspective:
              'Thiel argues that sales works best when hidden, so engineers conclude it does not exist or does not matter. Every failed technically-excellent product is evidence against "build it and they will come" — and the distribution channel usually has to be designed with as much care as the product itself.',
          },
        ],
      },
      {
        id: 'lean-startup',
        title: 'The Lean Startup',
        author: 'Eric Ries',
        year: 2011,
        minutes: 7,
        spine: 'Build. Measure. Learn.',
        blurb:
          'A startup is an experiment, not a smaller version of a company. The job is not to execute a plan — it is to find out which parts of the plan are wrong, quickly and cheaply.',
        slides: [
          {
            kicker: 'The redefinition',
            title: 'Validated learning is the unit of progress',
            body: [
              'Startups exist under extreme uncertainty, which makes traditional milestones — shipped on time, on budget, to spec — dangerous. You can hit all three and build something nobody wants.',
              'The alternative currency is validated learning: demonstrating empirically that you have discovered something true about your customers. Everything that does not produce learning is waste, however hard it was to build.',
            ],
            interaction: {
              type: 'quiz',
              prompt: 'Your team spends six months building a beautiful feature nobody uses. What did you achieve?',
              options: [
                { label: 'Nothing — six months wasted.', correct: false, feedback: 'Close, but too generous to the process. Waste is the outcome; the deeper problem is that you could have learned the same thing in a week and chose not to test.' },
                { label: 'Learning — you now know customers do not want it.', correct: true, feedback: 'True, and expensive. Ries’s point is that the learning was purchasable for a fraction of the price. The failure is not the wrong answer; it is paying six months for a one-week experiment.' },
                { label: 'A shipped feature — the roadmap moved.', correct: false, feedback: 'This is exactly the trap. Shipping on schedule is a real achievement in an established business and a vanity metric in a startup, where the plan itself is the untested hypothesis.' },
              ],
            },
          },
          {
            kicker: 'The engine',
            title: 'The Build–Measure–Learn loop',
            body: [
              'The loop is drawn build → measure → learn, but it is planned in reverse. You start from what you need to learn, work out what would measure it, and then build only the smallest thing that produces that measurement.',
              'The goal is to minimise total time through the loop, not to maximise the output of any one stage.',
            ],
            interaction: {
              type: 'steps',
              prompt: 'Run one turn of the loop.',
              steps: [
                { title: 'State the leap-of-faith assumption', text: 'Every plan rests on two: the value hypothesis (will people find this valuable?) and the growth hypothesis (how will they find it?). Write the riskiest one down as a falsifiable sentence.' },
                { title: 'Decide what would change your mind', text: 'Pick the number and the threshold in advance. "If fewer than 30% of signups return in week two, the assumption is wrong." Deciding after the fact is how teams talk themselves out of bad news.' },
                { title: 'Build the smallest test', text: 'A landing page, a concierge service, a manual back end, a video. If a fake door answers the question, the real door is premature.' },
                { title: 'Measure with real behaviour', text: 'Not opinions, not surveys, not enthusiasm in a demo. What people did, in cohorts, with the option to walk away.' },
                { title: 'Learn and decide', text: 'The loop only closes when the result changes what you do next. If both outcomes lead to the same plan, you did not run an experiment.' },
              ],
            },
          },
          {
            kicker: 'The instrument',
            title: 'The minimum viable product',
            body: [
              'An MVP is not a smaller product or a buggy one. It is the fastest way to start the loop with the least effort — often not a product at all.',
              'Tap through four forms it takes in practice.',
            ],
            interaction: {
              type: 'flip',
              prompt: 'Tap each MVP pattern.',
              cards: [
                { front: 'The video MVP', back: 'Dropbox demoed a product that did not work yet. Overnight the beta waiting list went from 5,000 to 75,000 — validating demand before solving the hard synchronisation problem.' },
                { front: 'The concierge MVP', back: 'Deliver the service manually to a handful of customers, by hand, at absurd unit economics. You are buying insight, not margin — and you learn what to automate.' },
                { front: 'The Wizard of Oz MVP', back: 'The front end looks automated; humans do the work behind the curtain. Customers get the real experience while you avoid building an engine for a demand you have not confirmed.' },
                { front: 'The smoke test', back: 'A landing page with a price and a buy button. Measure intent before capability. Uncomfortable, fast, and far cheaper than the alternative.' },
              ],
            },
          },
          {
            kicker: 'The scoreboard',
            title: 'Vanity metrics versus actionable ones',
            body: [
              'Total registered users only goes up. It cannot deliver bad news, which makes it useless for decisions and excellent for reassurance.',
              'Innovation accounting replaces gross numbers with cohort behaviour: split customers by when they arrived and watch whether each successive group behaves better than the last.',
            ],
            interaction: {
              type: 'slider',
              prompt: 'Drag through the same company, measured two ways.',
              stops: [
                { label: 'The vanity chart', text: 'Cumulative signups: up and to the right, every single month. The board is delighted. It would look identical if the product were getting worse.' },
                { label: 'The cohort view', text: 'Split by join month. January cohort: 8% activate. February: 8.2%. March: 7.9%. The line went up because marketing spend went up. The product is flat.' },
                { label: 'After a real improvement', text: 'April cohort: 14%. A change to the product moved the behaviour of new users. This is a signal you can act on; the cumulative chart could never have shown it.' },
                { label: 'The three engines', text: 'Growth comes from one of: sticky (retention beats churn), viral (customers bring customers), or paid (margin funds acquisition). Pick one and tune its specific metric.' },
                { label: 'The discipline', text: 'Metrics must be actionable, accessible and auditable. If a number cannot be traced to a cause, it is a story about the past, not a tool for the next decision.' },
              ],
            },
          },
          {
            kicker: 'The decision',
            title: 'Pivot or persevere',
            body: [
              'A pivot is a structured course correction testing a new fundamental hypothesis — not a euphemism for failure and not a full restart. Ries argues most startups pivot too late, because the runway to pivot is spent proving the original idea was not that bad.',
              'The fix is procedural: schedule the meeting in advance, so the decision is not held hostage by the mood of the week.',
            ],
            pullQuote:
              'The question is not "can this product be built?" but "should this product be built?"',
            interaction: {
              type: 'checklist',
              prompt: 'Prepare an honest pivot-or-persevere meeting.',
              items: [
                'Put it in the calendar on a fixed cadence, before you need it.',
                'Bring cohort charts, not cumulative totals.',
                'Restate the original leap-of-faith assumptions in writing.',
                'Name what the last few experiments actually proved — and what they did not.',
                'Choose a pivot type if pivoting: zoom-in, zoom-out, customer segment, platform, or business architecture.',
                'Set the threshold that would trigger the next such decision.',
              ],
              done: 'Ries’s test for whether you are truly persevering rather than drifting: can you say what you have learned since the last meeting, and would a stranger looking at the data reach the same conclusion?',
            },
          },
        ],
        deepDive: [
          {
            q: 'What is the riskiest assumption underneath your current project — and what is the cheapest experiment that could kill it this week?',
            hint: 'The riskiest assumption is usually the one you have never phrased as a question.',
            perspective:
              'Teams instinctively test what is easy to test and build what is fun to build, which leaves the load-bearing assumption untouched until launch. Ries’s discipline is to rank assumptions by how much of the plan collapses if they are false, then attack the top of that list first — with the crudest instrument that would settle it.',
          },
          {
            q: 'Which number does your team quote most often, and could it ever tell you bad news?',
            hint: 'If a metric only goes up, it cannot be a decision-making tool.',
            perspective:
              'Vanity metrics survive because they are comforting to report and impossible to disprove. The practical replacement is cohort analysis: it isolates whether the product is improving from whether spending is increasing, and it is capable of saying no.',
          },
          {
            q: 'If you had to reach a genuine pivot-or-persevere decision on Friday, what evidence would you be missing — and why have you not gathered it?',
            hint: 'The missing evidence is often missing on purpose.',
            perspective:
              'Ries observes that founders postpone the pivot decision by keeping the data ambiguous, because ambiguity preserves hope. Naming the specific evidence you lack converts an emotional decision into a scheduling problem — which is a far more tractable one.',
          },
        ],
      },
    ],
  },
  {
    id: 'meaning',
    name: 'Philosophy & Meaning',
    tagline: 'Old answers to the questions that do not age',
    glyph: '❖',
    books: [
      {
        id: 'meditations',
        title: 'Meditations',
        author: 'Marcus Aurelius',
        year: 180,
        minutes: 8,
        spine: 'A private notebook, never meant for you',
        blurb:
          'The most powerful man in the Roman world wrote reminders to himself about death, anger and duty. He was not teaching. He was coping — which is why it still works.',
        slides: [
          {
            kicker: 'The foundation',
            title: 'The dichotomy of control',
            body: [
              'Some things are up to us: our judgements, intentions, and responses. Everything else — health, reputation, other people, the outcome of any action — is not.',
              'Stoicism is not indifference to the world. It is the refusal to stake your peace on the part of the world you do not govern. You still act; you simply do not demand that reality ratify your effort.',
            ],
            interaction: {
              type: 'quiz',
              prompt: 'Your work is criticised unfairly in public. What is genuinely within your control?',
              options: [
                { label: 'Correcting the record so people think well of you.', correct: false, feedback: 'You can attempt it — but what people conclude is theirs, not yours. Marcus: "How much time he gains who does not look to see what his neighbour says or does or thinks."' },
                { label: 'Whether you take it as an injury, and what you do next.', correct: true, feedback: 'Exactly. The criticism is an external event; the wound is a judgement you add. "If you are distressed by anything external, the pain is not due to the thing itself, but to your own estimate of it."' },
                { label: 'Making sure it never happens again.', correct: false, feedback: 'A reasonable wish and an impossible commitment. Marcus opens Book II by rehearsing the day’s ingratitude in advance — not to become bitter, but to stop being surprised.' },
              ],
            },
          },
          {
            kicker: 'The perspective',
            title: 'The view from above',
            body: [
              'Marcus repeatedly zooms out — not to belittle his troubles, but to restore their true size. A grievance that occupies a whole mind occupies almost none of the world.',
              'Drag to pull the camera back.',
            ],
            interaction: {
              type: 'slider',
              prompt: 'Drag to widen the frame.',
              stops: [
                { label: 'This hour', text: 'The insult, the delay, the unanswered message. At this distance it is the only thing in the frame, and it feels permanent.' },
                { label: 'This life', text: '"Think of the whole of existence, of which you are the smallest part; the whole of time, in which you have been assigned a brief and fleeting moment."' },
                { label: 'This city', text: 'Marcus imagines looking down on the whole empire — marriages, arguments, markets, funerals, all proceeding at once. Yours is one thread among millions being pulled simultaneously.' },
                { label: 'This age', text: '"Alexander the Great and his mule driver both died and the same thing happened to both." Every person you envy is on the same schedule.' },
                { label: 'Back to now', text: 'And the point of the zoom is the return: the only thing anyone can lose is the present moment, because it is the only thing anyone has. So spend this one well.' },
              ],
            },
          },
          {
            kicker: 'The method',
            title: 'The obstacle is the way',
            body: [
              '"The impediment to action advances action. What stands in the way becomes the way." It is the most quoted line in the book and the most misread — it is not a promise that setbacks are secretly good.',
              'It is a claim about material: virtue can be practised on any circumstance, so no circumstance can prevent it.',
            ],
            interaction: {
              type: 'steps',
              prompt: 'Work through an obstacle the Stoic way.',
              steps: [
                { title: 'Separate event from judgement', text: 'What happened, stated plainly, with no adjectives. "The contract was cancelled" — not "they destroyed a year of my work."' },
                { title: 'Ask what is mine here', text: 'The cancellation is not. My response, my next call, my conduct in the meeting: all mine, all available immediately.' },
                { title: 'Name the virtue this calls for', text: 'Courage, patience, justice, restraint. The blocked road did not remove the chance to act well; it specified which way of acting well is now needed.' },
                { title: 'Act, without requiring the outcome', text: 'Do the work as well as you can, then release it. "Do what nature demands. Get a move on — and stop worrying whether anyone will notice."' },
                { title: 'Return, when you drift', text: 'Marcus wrote the same lessons to himself for years. The practice is not learning it once; it is coming back after forgetting, without self-reproach.' },
              ],
            },
          },
          {
            kicker: 'The discipline',
            title: 'Memento mori',
            body: [
              'Death runs through the notebook, not morbidly but practically: as an editor. Knowing the deadline reveals which activities were never worth the hours.',
              'Tap each line to see what he was actually doing with it.',
            ],
            interaction: {
              type: 'flip',
              prompt: 'Tap each line to unpack it.',
              cards: [
                { front: '"You could leave life right now. Let that determine what you do and say."', back: 'Not a threat — a filter. Most of what fills a day survives this test poorly, which is the entire point of applying it.' },
                { front: '"Waste no more time arguing what a good man should be. Be one."', back: 'Written by a man who read philosophy constantly, to himself, about himself. The temptation to prepare instead of act is ancient.' },
                { front: '"The best revenge is not to be like your enemy."', back: 'Justice as self-protection. Retaliation makes you adopt the character you objected to; declining is the only outcome fully in your control.' },
                { front: '"Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth."', back: 'The epistemic root of the whole system: if impressions are interpretations, then examining them is the one intervention always available.' },
              ],
            },
          },
          {
            kicker: 'The practice',
            title: 'A day, book-ended',
            body: [
              'Meditations survives because it is not a treatise — it is a training log. The Stoics treated philosophy as something you rehearse in the morning and review at night, the way a musician treats scales.',
              'The routine below is assembled from what Marcus and his sources actually describe doing.',
            ],
            pullQuote:
              'You have power over your mind — not outside events. Realise this, and you will find strength.',
            interaction: {
              type: 'checklist',
              prompt: 'Assemble a Stoic day.',
              items: [
                'Morning: rehearse the difficulty ahead — "today I will meet interference, ingratitude, disloyalty."',
                'Before each task: ask which part of this is up to me.',
                'During: when provoked, name the impression before responding to it.',
                'Evening: review the day — what did I do badly, what well, what was left undone?',
                'Weekly: read something that reminds you of the size of things.',
                'Always: judge yourself by your intentions and conduct, never by the reception.',
              ],
              done: 'Note what is missing: no goals, no outcomes, no achievements. The entire scorecard is conduct — the only category the emperor of Rome considered reliably his.',
            },
          },
        ],
        deepDive: [
          {
            q: 'Write down the thing troubling you most right now. How much of it is the event, and how much is your judgement about the event?',
            hint: 'Try stating it twice — once as a news headline, once as you actually feel it.',
            perspective:
              'Marcus’s technique was to strip the description back to the bare physical fact and watch the distress lose most of its material. The exercise rarely removes the problem, but it separates the part that requires action from the part that requires only a decision — and those need very different responses.',
          },
          {
            q: 'Whose opinion are you outsourcing your peace of mind to — and did you ever agree to that arrangement?',
            hint: 'Name a specific person, not "people".',
            perspective:
              'Marcus, who could have had almost anyone executed, spends remarkable time reminding himself not to care what they thought. His argument is not that reputation is worthless but that it lives in other people’s minds, which makes staking your equilibrium on it a permanent hostage situation.',
          },
          {
            q: 'If today were the deadline, which of the things on your list would you drop instantly — and why is it still on the list?',
            hint: 'The honest answer often involves someone else’s expectations.',
            perspective:
              'Memento mori is used here as an editing tool rather than a source of dread. The items that fail the test usually persist because dropping them requires a conversation you have been avoiding — which reframes the problem from philosophical to practical.',
          },
        ],
      },
      {
        id: 'mans-search-for-meaning',
        title: "Man's Search for Meaning",
        author: 'Viktor E. Frankl',
        year: 1946,
        minutes: 8,
        spine: 'Say yes to life, in spite of everything',
        blurb:
          'A psychiatrist survives three years in the camps and returns with a claim: the will to meaning is the deepest human drive, and it can survive conditions that destroy everything else.',
        slides: [
          {
            kicker: 'The observation',
            title: 'The last of the human freedoms',
            body: [
              'Frankl watched men give away their last piece of bread, and watched others become brutal. The same conditions produced both, which told him conditions were not the deciding factor.',
              'What remained, when everything else had been stripped away, was the choice of attitude toward the circumstances — a freedom nobody could confiscate.',
            ],
            pullQuote:
              'Everything can be taken from a man but one thing: to choose one’s attitude in any given set of circumstances.',
            interaction: {
              type: 'quiz',
              prompt: 'Frankl argues that between what happens to you and how you respond, there is —',
              options: [
                { label: 'Nothing. Response follows stimulus automatically.', correct: false, feedback: 'This was precisely the view Frankl’s experience contradicted. If it were true, identical conditions would have produced identical men. They did not.' },
                { label: 'A space, in which your freedom lives.', correct: true, feedback: 'Yes. "In our response lies our growth and our freedom." The space may be small and it may take everything you have to use it — but its existence is the claim the whole book rests on.' },
                { label: 'Only what your upbringing already decided.', correct: false, feedback: 'Frankl explicitly rejected the determinism of both the psychoanalytic and behaviourist schools he trained alongside — not on theory, but on what he had watched people do.' },
              ],
            },
          },
          {
            kicker: 'The thesis',
            title: 'Three roads to meaning',
            body: [
              'Logotherapy — from *logos*, meaning — holds that meaning is not invented but discovered, and that it is always specific: this person, this situation, this moment.',
              'Frankl identified three ways it is found. Tap each.',
            ],
            interaction: {
              type: 'flip',
              prompt: 'Tap each road.',
              cards: [
                { front: 'Through work', back: 'By creating something or doing a deed. Not a job title — a contribution whose completion depends on you. Frankl reconstructed his lost manuscript in his head, and the unfinished book became a reason to survive typhus.' },
                { front: 'Through love', back: 'By encountering someone — experiencing another person in their whole uniqueness. On a forced march in the dark, Frankl held a conversation with his wife, not knowing she was already dead, and understood that love outlasts its object.' },
                { front: 'Through suffering', back: 'By the attitude taken toward unavoidable suffering. The qualifier is essential: if suffering can be removed, removing it is the meaningful act. Only the unavoidable kind becomes an achievement.' },
                { front: 'The catch', back: 'Meaning cannot be pursued directly — like happiness, it "ensues" from dedication to something beyond yourself. Aim at it and it recedes; serve something and it arrives without being asked.' },
              ],
            },
          },
          {
            kicker: 'The claim',
            title: 'Tragic optimism',
            body: [
              'Frankl’s late idea: saying yes to life despite the "tragic triad" of pain, guilt and death. Not optimism about outcomes — optimism about what a person can still make of what remains.',
              'Follow the argument as he built it.',
            ],
            interaction: {
              type: 'steps',
              prompt: 'Step through the argument.',
              steps: [
                { title: 'The premise', text: 'Suffering, guilt and mortality are not exceptions to life; they are its permanent conditions. Any philosophy that requires their absence is a philosophy for good weather only.' },
                { title: 'The turn on suffering', text: '"When we are no longer able to change a situation, we are challenged to change ourselves." The situation becomes an assignment rather than an injustice.' },
                { title: 'The turn on guilt', text: 'From guilt, the opportunity to change for the better — responsibility is only meaningful for a being who could have done otherwise and can still do otherwise.' },
                { title: 'The turn on death', text: 'From life’s transitoriness, an incentive to act. "Having been is the surest kind of being" — what is done is stored in the past, where nothing can remove it.' },
                { title: 'The instruction', text: '"Live as if you were living already for the second time, and as if you had acted the first time as wrongly as you are about to act now."' },
              ],
            },
          },
          {
            kicker: 'The correction',
            title: 'The tension you need',
            body: [
              'Frankl argued against the assumption that mental health means the absence of tension. What people need is not equilibrium but *noö-dynamics* — the productive gap between who they are and who they ought to become.',
              'Drag the dial to see both failure modes.',
            ],
            interaction: {
              type: 'slider',
              prompt: 'Drag the tension dial.',
              stops: [
                { label: 'Nothing is asked of you', text: 'The "existential vacuum": boredom, apathy, the Sunday-afternoon feeling that life is a corridor. Frankl saw it in prosperous patients far more than in poor ones.' },
                { label: 'Comfort, filled with substitutes', text: 'The vacuum gets packed with pleasure, distraction, consumption, the will to power. They occupy the space without filling it, so the appetite grows.' },
                { label: 'A task worth your capacity', text: 'A demand that stretches you toward something outside yourself. Frankl compares it to architecture: an arch under load is more stable, not less.' },
                { label: 'Meaning under real strain', text: 'The camps showed him that people survive almost any *how* if they have a *why*. Those who lost the why deteriorated first, regardless of physical condition.' },
                { label: 'Beyond capacity', text: 'Frankl never romanticised this. Unavoidable suffering can be met with dignity; suffering you could remove and do not is not heroism but masochism.' },
              ],
            },
          },
          {
            kicker: 'The practice',
            title: 'Logotherapy, applied',
            body: [
              'Frankl built clinical techniques from the same principle. Paradoxical intention: the insomniac who tries to stay awake falls asleep, because anticipatory anxiety is what was keeping them up. Dereflection: stop monitoring yourself and turn attention outward.',
              'Underneath both is one instruction — stop asking what you want from life.',
            ],
            pullQuote:
              'Life ultimately means taking the responsibility to find the right answer to its problems, and to fulfil the tasks it constantly sets for each individual.',
            interaction: {
              type: 'checklist',
              prompt: 'Turn the question around.',
              items: [
                'Ask what this situation is asking of you, rather than what you are owed by it.',
                'Name one concrete task this week that would not get done without you.',
                'Name one person for whom your presence is not substitutable.',
                'Identify a suffering you can remove — and remove it, rather than ennobling it.',
                'For what remains unavoidable, decide what bearing it well would look like.',
                'Stop measuring your happiness; it only appears when you are not watching.',
              ],
              done: 'Frankl’s recommendation for the Statue of Liberty on the east coast: a Statue of Responsibility on the west. Freedom, he thought, degenerates into arbitrariness unless it is lived in terms of responsibility.',
            },
          },
        ],
        deepDive: [
          {
            q: 'What is life asking of you right now — and what changes if you answer that instead of asking what you want from it?',
            hint: 'Answer with a specific task or person, not an abstraction.',
            perspective:
              'Frankl called this the fundamental reversal: we stopped asking about the meaning of life and instead thought of ourselves as those being questioned by it. It is a deliberately narrowing move — it converts an unanswerable question into a concrete assignment attached to today.',
          },
          {
            q: 'Is there a suffering in your life you have been ennobling when you could simply be ending it?',
            hint: 'Frankl’s test is one word: avoidable.',
            perspective:
              'The most misused idea in the book is that suffering confers meaning. Frankl was explicit that meaning attaches only to *unavoidable* suffering — and that choosing to endure a removable one is not courage but a failure of responsibility. Applying the distinction honestly usually implicates a decision you have been deferring.',
          },
          {
            q: 'What is your "why" — the thing that would let you bear almost any "how"? And have you tested it, or merely assumed it?',
            hint: 'A why that only works on good days is a preference, not a why.',
            perspective:
              'Frankl watched prisoners lose the future — a date they had fixed hope on that passed uneventfully — and die within days, physically unchanged. His conclusion was that a why must be renewable and specific rather than a single anticipated event, or it becomes a countdown with a failure mode built in.',
          },
        ],
      },
    ],
  },
]

export const allBooks = categories.flatMap((category) =>
  category.books.map((book) => ({ ...book, categoryId: category.id, categoryName: category.name }))
)

export function findBook(bookId) {
  return allBooks.find((book) => book.id === bookId) || null
}
