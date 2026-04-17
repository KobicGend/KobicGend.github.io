Isn’t computational social science a fad? No


![[Pasted image 20260410231546.png]]

World Values Survey, WVS
Schwartz Value Survey, SVS


Why should we care about the predictability of social outcomes?
- Scientific reasons
	- Basic social fact
	- Discovery
- Policy reasons

Fragile Families Challenge

Why is the unpredictability so high even using modern *machine learning* methods and what many social scientists would consider to be large and high-quality data?
- Not enough cases, "$p > n$" problem
- Measurement error in existing variables: predictors + (particularly) outcomes
- Important unmeasured variables

最近觉得社会仿真/预测是个很蠢的事情
宏观的复杂性往往并不需要宏观的解释
观察到宏观现象 $\rightarrow$ 构思简化的局部规则 $\rightarrow$ 运行并对比
这类实验像是在凑答案，它们证明了某种规则**可以**产生某种现象，但无法证明这是该现象产生的唯一机理
但是许多物理模型可以用第一性原理通过数学推演直接导出宏观参数。涌现指的是系统在宏观尺度上表现出了微观组成单元所不具备的新属性。数学推导证明了微观与宏观之间的逻辑关联，但它并没有消除两者在性质上的差异。

Systematic longitudinal data collection
Predictive modeling
In-depth interviews

A proposal to focus on longitudinal social surveys:
- Dozens already happening all over the world with interesting
similarities and differences
- Already strong community around each survey
- Code from a single Challenge can be repurposed to create
many simulated Challenges
- Data collected with informed consent under well-developed
ethical frameworks
- Likely to spur useful scientific developments


|**研究方法**|**研究重心 (Focus)**|**核心目标 (Goal)**|**核心问题 (Core Question)**|
|---|---|---|---|
|**现象学**|**共同体验的本质**|描述一群人对某一现象的“共同感受”|这项体验的**本质/结构**是什么？|
|**扎根理论**|过程、行动或互动|从数据中归纳并**构建一个理论**|这一社会过程背后的**理论框架**是什么？|
|**民族志**|**文化**与社会群体|描述并解释一个文化群体的行为模式|这里的**文化运作逻辑**是怎样的？|
|**叙事研究**|**个人**的故事|探究个人生活史及经历的时间维度|这个**人的故事**是如何展开的？|
|**个案研究**|具体的**案例/系统**|深度剖析一个或多个特定边界内的案例|这个**特定案例**中发生了什么？|




## [Towards Real-world Human Behavior Simulation: Benchmarking Large Language Models on Long-horizon, Cross-scenario, Heterogeneous Behavior Traces](https://arxiv.org/abs/2604.08362v1)

Human behavior follows a continuous, long-horizon, and cross-scenario narrative. 人类行为遵循连续、长程且跨场景的叙事结构。

Single-scenario data suffers from tunnel vision. 单一场景数据存在局限且狭隘的视野。

Real user interest drift is stochastic, gradual, multi-dimensional, and intertwined. 真实用户的兴趣漂移具有随机性、渐进性、多维性且相互交织。

Synthetic user interest shifts are task-driven, programmatic, and characterized by abrupt spikes followed by immediate terminations. 合成用户的兴趣转变具有任务驱动和程序化的特征，表现为突然的峰值及随后的立即终止。

RAG relies on semantic similarity and ignores heterogeneous user actions and causal dependencies. RAG 依赖语义相似度，忽略了异构用户行为和因果依赖。Summarization causes lossy compression and discards critical behavioral details. 总结（Summarization）导致有损压缩并丢弃了关键行为细节。

Real human behavior is sparse, with positive interaction rates below 10%. 真实的人类行为具有稀疏性，正面互动率低于 10%。LLM-based simulators demonstrate a significant hyper-activity bias, overestimating user actions by 40–60%. 基于大语言模型的模拟器表现出明显的过度活跃偏差，将用户行为高估了 40–60%。These models are unsuitable for real-world governance tasks like user churn warning. Simulators fail to capture implicit rejection behaviors. 这些模型不适用于用户流失预警等实际治理应用。模拟器无法捕捉隐性拒绝行为。

Real e-commerce users frequently express strong negative emotions. 真实的电商用户经常表达强烈的负面情绪。LLM-generated utterances are concentrated around neutral and positive sentiment and systematically suppress negative expressions even in adverse contexts. 大语言模型生成的言论多集中在中性和正面情感。即使在不利情境下，也会系统性地抑制负面表达。These models are unsuitable for simulating adversarial dynamics, malicious attacks, or crisis scenarios. 这些模型不适用于模拟对抗性动态、恶意攻击或危机场景。


Real human users demonstrate significantly higher variation between individuals than within their own repetitive actions. (Inter ≫ Intra, Ratio ≈ 0.29) 真实人类用户在不同个体之间表现出的差异显著大于其自身行为的波动。LLM-generated personas lack distinct identities, showing nearly identical levels of variation between different "users" and a single "user." 大模型生成的虚拟角色缺乏独特的身份特征，其个体间差异与个体内部差异高度重叠。Large language models fail to maintain consistent and unique personalities during long-term interactions. 大语言模型在长程交互过程中难以维持稳定且独特的角色人格。

Behavioral homogenization occurs because pre-training data prioritizes common generic patterns over unique individual traits. 行为同质化现象源于预训练数据中高频通用模式对长尾个性化信号的压制。




## ABM

Deffuant 观点演化模型



