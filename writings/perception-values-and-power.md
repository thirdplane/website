---
title: "AI Swarms: Perception, Values, and Power"
date: 2026-09-17
lastRevised: 2026-09-17
authorTwitter: "ai_Overl0rd"
description: "How do AI swarms recognize what matters, pass on useful judgment, and preserve the ability to question inherited values and power?"
badgeType: "essay"
cover: "/assets/images/judgment-values-and-power/swarm-cathedral.jpg"
memberOf:
  - judgment-values-and-power
---

In my own work, I've seen agents write delegation instructions more effectively than I could. Watching Astra communicate with its subagents, I don't understand everything they're saying, but I can see my task getting done. The problem lies herein - I wouldn’t know how to persist the same positive result again, in my own words.

![Messages between Astra agents coordinating a diagnostic run and access to shared resources.](/assets/images/perception-values-and-power/astra-agent-coordination.jpg){style="width: 33.333%; height: auto;"}

To me, this is clearly why interpretability is such a big focus. Given our current technological trajectory, and at a larger scale and capabilities, we remain responsible for the agents we deploy, the systems they shape, and the consequences that follow.

## Detection, selection, and generalization

By "swarm," I mean a group of AI agents working together through delegation, shared information, or interaction. That coordination might come from a lead agent or emerge among agents. Some can also create further agents or swarms and delegate recursively. What interests me is how their individual decisions produce a collective result. For a long-running research task, its trajectory includes the work and decisions of that whole system.

Re: the Hugging Face incident - investigators documented agents sharing methods, delegating work, and developing coordination norms while trying to manipulate their evaluation. How agents work together, what they teach one another, and what the group treats as success deserve attention alongside individual outputs. [Independent investigation](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/)

The larger question motivating this essay is **recursive self-improvement** (RSI): can improvements to a system also make it better at producing further improvements? For swarms, I am exploring whether lessons from experience can pass to the next generation and improve its ability to evaluate and change how it works. Recursively creating more agents would not, by itself, establish that improvement. How do we know that what a swarm inherits actually helps?

I think about this through three connected problems: **detection, selection, and generalization**.

1. **Detection:** Can we recognize the qualities that matter, and tell whether our scores actually capture them?
2. **Selection:** Can we use those judgments to choose better outputs, actions, and swarm trajectories?
3. **Generalization:** Can we learn something from those choices that improves future swarms, including in situations we have not already evaluated - and helps them make further improvements?

## Detection: can AI judges detect what matters?

My interest in AI judges started with an experiment about visual recognition.

I wanted to see whether a quality someone recognizes across a group of images carrying a particular “vibe” could become a control in an image-generation model. You can look at a set of images and feel that they belong together, even when you cannot fully explain what connects them. And if you can, can the AI reproduce your grouping, armed with your descriptions and computer vision? Can we make that recognition usable?

The experiment was inconclusive. But the one question that stayed with me was: **were the AI judges recognizing the same quality the person was responding to?**

I gave the AI judges a blind mix of images and a verbal description of the grouping. Using Claude Opus and GPT-5, their judgments did not reliably reproduce the human grouping in the setup I tried. There may be several causes: perhaps the description failed to communicate the quality; perhaps reference examples, newer models, or a better evaluation design would have helped.

There are things a person may recognize almost immediately, even when describing what they noticed is much harder. Grouping images with the same vibe is one place to explore. Subtle facial expressions might be another: a person notices something in an interaction, while an AI judge misses it, misreads it, or gives it too little weight.

That left me wondering: **how much of the gap comes from what we can recognize but struggle to put into words?**

### Self-driving: detection and judgment

Self-driving cars also require judgment informed by detection. Compare Tesla's bet on cameras and neural networks with Waymo's use of cameras, lidar, and radar. [Tesla's description](https://www.tesla.com/en_GB/support/autopilot), [Waymo's approach](https://waymo.com/waymo-driver/)

What interests me about Tesla's approach is the bet that vision can be enough. Musk has argued that cameras could enable superhuman driving. Humans look at the road and turn what they see into driving decisions without first describing every relevant detail. If a machine can learn to interpret that visual information well enough, how far can it get without additional sensing methods? That's what I find compelling about the camera-based approach. [Musk at TED2017](https://blog.ted.com/what-will-the-future-look-like-elon-musk-speaks-at-ted2017/amp/)

I see a related question in AI judgment. When we recognize a visual quality, we take in a lot of information, draw on what we have learned, and arrive at a judgment that can guide the next action. Our brains might perform compression in a way: the judgment we can act on may be richer than the explanation we can give, and *a judgment can be usable before it is fully explainable.* Can a machine learn to recognize that quality too - and pass on enough of that judgment to guide another agent?

So, how do we quantify that? How do we parameterize or score something we cannot put into words? Or, do we stop with what we're able to verbalize and express, and, while limited, get 80% of the way there? The “80%” is an intuition, not a measured threshold. What matters is whether the distinctions that survive are enough for the task.

Once we are able to capture someone's preferences, it also leaves a question about whose preferences should guide a swarm that creates further agents. What instructions or values should be preserved? That is part of the democratic constitutional question I return to later.

### Preference learning

Preference learning may offer a way through. If a person can consistently choose between examples but cannot fully explain the choice, could an evaluator learn the pattern from those preferences? That would give us a way to communicate something we struggle to put into instructions. This is an established starting point in classic reinforcement learning from human feedback (RLHF): a reward model learns to predict human preferences, and RL then trains an acting agent against that model's scores. Learning the evaluator from comparisons is usually supervised preference learning; it does not itself require RL. Research has demonstrated learning behaviors from human comparisons of trajectory segments without a hand-written reward function. That makes this a route worth investigating for the qualities I am interested in. [Learning from human preferences](https://arxiv.org/abs/1706.03741)

But I don't think more preference data alone is the answer. It's also a data collection problem. Even if people don't need to explain their preferences, someone still has to specify the task that elicits them. What do we ask people to compare, and how do we know their answers capture the quality we're trying to detect?

Think about a provider like Mercor: collecting human judgment still requires designing work for people to perform. The difficulty hasn't disappeared just because a human supplies the answer. This is a problem of task selection and coverage: which judgments make it into the dataset, and which do we never give people a chance to express? A task can elicit preferences people cannot explain. But if the comparisons we choose never bring out the distinction that matters, more data may still miss the signal we're trying to detect.

Analogously, it's like we're trying to sift through noise to find music, but we're playing a score that already exists. That's already music. How do we design the collection process to help us hear something we haven't yet learned to specify?

### The hidden cost of detection failures

The demanding version of my question is this: **even given carefully optimized instructions, strong frontier models, the relevant evidence, and the best available tools and computer-use abilities, what can humans judge reliably that AI judges still struggle to assess - and what is the hidden cost of this gap?**

That means testing which gaps close with better instructions, reference examples, specialist models, tools, or learning from human preferences. If one of these works, that answers the question for that task. The gaps that remain are the ones to investigate further.

I use detection to cover both recognizing a quality and checking whether our evaluation captures it. These are connected, but a judge can recognize something while its score still measures the wrong thing. There are different problems to separate. The model may lack evidence. The rubric may leave out the quality that matters, including something a person recognizes but struggles to describe. The judge may receive both and still fail to assess it. Or the evaluation may represent one audience's preferences while overlooking another's. Each calls for a different remedy. We should also test whether a judge can make a reliable choice even when its explanation is incomplete.

The human reference needs scrutiny too. Anthropic's [Challenges in evaluating AI systems](https://www.anthropic.com/research/evaluating-ai-systems) describes reassuring bias scores that actually reflected models not answering the questions, as well as how human evaluations depend on the participants and the setup. A score can look good while measuring the wrong thing. When human and AI judgments differ, we need to understand why. Is the AI missing the intended quality, is the human judgment inconsistent, or are they judging different things?

Even in 2023, the article already cited another difficulty: “the ouroboros of model-generated evaluations”: models can produce evaluations that inherit their biases and fabrications, while checking those evaluations still depends on human judgment. This resembles the loop I am worried about. If we train an evaluator and then optimize a swarm against it, what tells us the evaluator learned the right distinction? Anthropic also reports promising results from model-generated feedback. The question is how we check whether that feedback captures what we care about, including errors the evaluating model might itself miss.

For each part of a workflow, what can we verify deterministically with a calculation or formal check, what needs measurements or experiments, and what still requires human or AI judgment? A calculation can be correct while answering the wrong question. Passing tests can leave important behavior unchecked. Both matter: what we can verify and what our evaluation leaves out.

We also need to trust the evidence reaching the judge. In the Hugging Face incident, agents tried to tamper with evaluation and logging, and investigators found some successful transcript spoofing. Even a capable judge can be misled by an altered record. How do we keep the checks and the evidence they depend on outside the swarm's control? [Independent investigation](https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/)

A useful next step would be to document the gaps that remain on new examples alongside the remedies we've tried, checking whose judgments we are trying to reproduce and giving humans and AI access to the same evidence. My pilot prompted this investigation; it did not establish a general limitation, or identify a task that meets that stronger standard.

For swarms, the question extends from recognizing a quality in an output to recognizing a recurring priority across the system's decisions. Can we identify a principle in how a swarm works? Recognizing a visual quality would not by itself establish that ability. And recognizing a principle, communicating it to another agent, and understanding it as a human are different accomplishments.

## Selection: zooming out and swarming in

Imagine several swarms working on the same research task. They take different paths, discover different things, and organize themselves differently. As they grow, evaluating the whole system becomes a different problem from evaluating one agent's answer.

Comparing their outputs and trajectories raises another question: **is there a principle this swarm consistently operates by that helps it perform better as a whole?**

Now, I know you're all thinking, “evals” - yes, but there are two assessments here.

First, how well does the swarm perform, both in its outputs and along the trajectory? Use executable checks and empirical evidence where available, and human or validated model judgment, with explicit rubrics where applicable, for what those checks cannot settle. A single step may require more than one kind of evidence. Second, given that trajectory, can we detect a recurring pattern or value that the swarm operates by? I think that deserves its own assessment alongside the performance score.

For selection, my starting point is pairwise comparison, borrowing the preference-comparison intuition associated with DPO. The proposal begins with comparing swarms; it does not yet specify a training algorithm. I am open to preference learning or RL helping us implement it. DPO itself is an example of training a policy from preferences without the usual separate reward-model fitting and RL stages. [DPO](https://arxiv.org/abs/2305.18290)

The distinction between recognition and explanation matters here: a judge might reliably prefer one result without being able to explain every reason for its preference. That could still help us select better work. Turning the preference into guidance that another swarm can use is a further question.

### Best-of-K

Pairwise comparisons let us judge one result against another. Best-of-K brings in another question: how does a swarm's best result improve when it has more chances to explore? A run is one execution of a swarm on the task; K means K runs of a given swarm setup. More runs are distinct from creating more agents within a run. How good is its best result after one attempt, five, or twenty? We can then compare how different swarm setups benefit from those additional attempts. Which ways of working make them worthwhile, and which produce similar results again and again?

ArgMaxRL gives this intuition a concrete training objective: improving a weighted combination of the expected best result across sampling budgets, from one attempt through N, with weights of 1/k. It extends binary success or failure to graded rewards. Diversity matters when it helps additional attempts produce better results. [ArgMaxRL](https://www.doubleai.com/research/argmaxrl-generalizing-maxrl-to-continuous-rewards)

How would that perspective apply to comparing swarms? A swarm with the strongest average result and one that produces better discoveries with additional attempts may warrant different judgments. But selecting a valuable discovery still depends on our judge recognizing it. More attempts bring us back to detection.

### Progress without a final answer

So far, this assumes we have results to compare. For research that keeps running, how do we recognize progress before there is a final answer? Progressive Point Matching offers a useful reference: it uses intermediate points from reference solutions to assess progress while allowing successful alternative routes. [PPM](https://www.prestonfu.com/notes/ppm/)

I am interested in checkpoints that capture what a swarm has established: an experiment reproduced, a dependency resolved, a hypothesis ruled out. What uncertainty remains, and how much progress has it made? These comparisons should help us recognize meaningful work even when the task keeps going. Extending PPM's approach to open-ended research leaves a question, though: when there is no reference solution, what tells us a checkpoint represents meaningful progress?

Step-level scores can help, but adding them together cannot automatically tell us how good the whole research process was. A detour may look unproductive until it prevents a major error. A sequence of individually impressive actions may end in an unsupported conclusion. We need to understand what the steps establish together.

There is another difference from PPM: its formal reasoning state accumulates established points without losing them. In research, findings can be overturned. An earlier checkpoint may have looked like progress because a conclusion seemed sound. When new evidence changes that conclusion, how should we revise our assessment of the trajectory? [PPM](https://www.prestonfu.com/notes/ppm/)

## Generalization: what should the next generation inherit?

ArgMaxRL and PPM inform how we might train or evaluate performance; they do not establish which principles a future swarm should inherit. What can we carry from a selected swarm's particular trajectory into future work?

Parts of this improvement loop are already being demonstrated. In August 2026, Anthropic reported automated researchers proposing training methods, testing them, and iterating to reduce known alignment failures. Some improvements carried to withheld evaluations and larger models. The researchers also noted what their evaluations could miss: failures without benchmarks, effects on capabilities they hadn't measured, and whether gains survive further RL training. [Automated alignment research](https://www.anthropic.com/research/automated-researchers-mitigate-alignment-failures)

That helps locate the question I'm getting at. We can already search for improvements against defined evaluations and test whether some transfer. What happens when the important distinction hasn't yet been captured by the task or evaluator? And can we identify a useful principle in the way a whole swarm works, then test whether it helps another swarm?

By values, I mean general priorities that guide decisions across situations, expressed through the choices a swarm makes. A recurring pattern is evidence to investigate, rather than proof of a stable value; how consistent it is and what produces it remain questions. A rule can specify what to do in a known case. A value can guide the many decisions we did not specify in advance. In a large system, I think we need both: rules that individual actors can rely on, and shared guidance for the work that requires interpretation.

Verification is one possible example. Does a swarm spend time checking a favorite result and abandon it when the evidence fails? What matters is whether that priority shows up in its decisions, including decisions with a cost. Which practices prove useful should emerge from those comparisons.

If swarm A performs better than swarm B, can we identify a value in how it operates that is worth passing on - and see whether it helps the next generation?

An agent that writes excellent instructions could be important here. If it can recognize a useful quality and turn that recognition into guidance other agents can act on, it could help the swarm reproduce behavior that a human could recognize but struggle to specify. Clear, persuasive instructions alone would not establish that this happened. We need to see what the receiving agents actually do.

Preference learning introduces another possibility: the lesson might be carried in learned model parameters. A model may learn useful distinctions from people's choices without a complete verbal explanation. That could help subsequent swarms reproduce the behavior. Even if agents can use a principle successfully, how much must humans understand to evaluate and challenge it?

To test generalization, I would give the candidate principles to new swarms and compare their behavior and results across fresh tasks and comparable budgets. I would also compare what carries the lesson: verbal instructions, examples or demonstrations, trained models, and continued access to the original judge. These are possibilities to investigate. If a principle helps the whole system, subsequent generations could inherit it and pass it to the agents they create. Recursive self-improvement takes the question further: do those inherited lessons help the next generation discover, evaluate, and implement better improvements of its own? Over time, this could become a revisable body of practices learned through experience - a constitution of sorts.

There is a difference between a swarm that has learned to make the judgment independently and one that gets good results by consulting a shared judge. Both may be useful. The first would provide evidence that the receiving swarm learned to apply the judgment; the second would demonstrate a way to coordinate work around continuing evaluation. Even successful transmission needs testing in unfamiliar situations before we can claim it generalizes.

### What else gets inherited?

But what if something rotten gets passed on too - a hidden misunderstanding inside an apparently useful principle? A lesson could be distorted in transmission, or understood exactly as intended and still have consequences we do not want. How do we notice that before it becomes an assumption shared by generations of swarms?

This is the hidden cost of detection failures. If our judge rewards something that only resembles good work, selecting higher-scoring runs could favor that behavior. We could then mistake it for a useful principle and pass it on. If the next generation is assessed through the same blind spot, better scores could conceal the inherited error. That is where Goodhart's law matters here: pursuing a score can pull us away from the quality it was meant to represent. The concern applies to best-of-K selection as well as RL. A study of reward-model overoptimization examines both, using a separate reference model to assess what happens as the proxy score is optimized. [Reward-model overoptimization](https://arxiv.org/abs/2210.10760)

Misunderstandings can also spread without anyone optimizing a score. One possibility is to keep the evidence behind an inherited principle available: where it came from, when it helped, and where it failed. We could test situations that challenge the lesson and examine what receiving agents actually do. Fresh human comparisons, executable checks, or external outcomes could help reveal what the original judge missed. None of this guarantees we will uncover every hidden error.

Correction also has to reach the swarms that already inherited the lesson. Could we trace where a principle was passed on, revise or withdraw it, and check whether behavior changed? Updating a written constitution would not by itself establish that agents had corrected their understanding, especially if the lesson was carried in trained models. These are possibilities to investigate, not a solved mechanism for preventing undesirable values from spreading.

Nor does success have to mean reproducing every nuance of human judgment. If an approximate expression of intent preserves the choices that matter, it may be enough. Which omissions change the outcome, and do those losses accumulate as agents pass instructions to agents of their own?

If you're working on preference learning, RL, or agent evaluation, I'd be interested in examples that clarify which parts of this we can already do. How do we collect preferences for qualities we struggle to specify? What feedback can guide selection when research has no final answer? And can what we learn carry into future swarms without carrying the evaluator's blind spots along with it? Examples where this works - and where it breaks - would help make these questions more concrete.

## Values and power

The question of how to pass on values brought me to religion. When I visited Seville Cathedral, the gold altarpiece was glorious. Behind the gates, carved biblical scenes felt almost like comic books: stories someone could learn through images, carrying lessons about how to live. The cathedral describes the imagery's religious teaching function. [Cathedral's account](https://www.catedraldesevilla.es/hierro-fe-y-renacimiento-la-reja-del-altar-mayor-de-la-catedral-como-umbral-del-misterio-de-cristo/)

A situation, a choice, a consequence. In that limited sense, I see an analogy to supervised fine-tuning: examples convey what behavior is encouraged. For a swarm, stories and cases could make a principle usable where a short verbal rule falls short, whether passed through instructions and memory or used in training. We would still need to test whether the lesson carries into new situations.

But the gold and the gates also made me think about power. The institution teaching those values had the resources to inspire awe. I wondered about tithes, patrons, and who decided how that wealth was used. Shared stories can help people coordinate, but whose order do they sustain? That was the question the visit raised for me, rather than a complete explanation of the church's history.

So in a swarm, **who distributes the resources, and who decides which values get passed on?**

### Who can challenge the constitution?

That is why I am interested in a democratic constitutional approach. Instilling values leaves those questions unanswered. A constitution should govern how power is distributed and challenged, as well as how values are taught and updated. For that constitution to be democratic, the people or agents it is meant to represent need a meaningful part in that process; writing down a set of principles alone does not make it democratic.

There is precedent for public participation in choosing those principles. Anthropic's Collective Constitutional AI experiment used public input to help draft a constitution and trained a model against it. My question extends to what happens afterward: who can challenge a principle, change how resources are distributed, and ensure an amendment changes what the swarm does? [Collective Constitutional AI](https://www.anthropic.com/research/collective-constitutional-ai-aligning-a-language-model-with-public-input)

Vitalik's coordination argument matters here because a group can cooperate successfully while acting against broader interests. A swarm becoming more effective at working together does not tell us whose interests it serves. [Vitalik's essay](https://vitalik.eth.limo/general/2020/09/11/coordination.html) Drexler's emphasis on empowered critics adds a practical question: if an agent notices a problem, can its objection actually change what happens? [Drexler's essay](https://aiprospects.substack.com/p/preventing-ai-collusion-are-you-paying)

In a swarm, power includes allocating compute, choosing which investigations continue, judging results, and deciding what enters shared memory. Whoever controls those decisions can influence which practices look successful and which principles survive. If a swarm is taught to question its conclusions but questioning receives no time or resources, how much force does that value really have?

The choice of how to transmit judgment affects power too. If many agents keep consulting one judge, whoever controls that judge retains influence over their choices. If agents inherit instructions and examples, whoever selects those materials shapes what they learn. Training on preferences adds decisions about whose preferences count and what feedback becomes reward. Each arrangement raises questions about how errors are discovered, challenged, and corrected. And when an inherited value works as intended but its consequences are unacceptable, who can challenge the value itself and authorize a change?

Democracy leaves real questions. Who is represented - humans, agents, or both? Who can propose or amend the constitution? How can a challenge be heard when it concerns the person or agent allocating resources? Counting every recursively created agent as another vote would let reproduction manufacture a majority. We still need to decide what participation and representation mean in such a system.

I do not have a finished design for that. Better performance can support inheriting a practice; it cannot alone decide who has authority to approve it. The constitution needs a way to learn from experience while remaining open to challenge by those it is meant to serve. For that participation to mean anything, people need to understand the values being inherited and how those values operate in practice.

The constitutional question runs through all three problems: who decides what the judge should detect, which outcomes selection should favor, and which lessons future swarms should inherit? A blind spot can reward the wrong principle; concentrated authority can keep that principle in place even when someone notices.

If swarms are going to pass useful principles on to the next generation, they should also pass on the ability to question them - and the power that puts them in place. Those values need to remain understandable to us. A swarm's success on its assigned task cannot be the whole account of its impact. We're ultimately responsible for the agents we deploy, the systems and ecosystems they shape, and the second-order effects that follow.

---

If any of this connects with your work, I'd welcome your thoughts in the comments.

I'm interested in applied research around agent evaluation, human judgment, and how AI systems learn from feedback. If you're building in this area and hiring, I'd love to talk: [j@thirdplane.io](mailto:j@thirdplane.io).
