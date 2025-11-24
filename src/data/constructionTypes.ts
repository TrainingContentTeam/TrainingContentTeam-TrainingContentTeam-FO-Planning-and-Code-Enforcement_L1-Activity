export const constructionTypes: Record<string, {
  label: string;
  description: string;
  correctFeedback: string;
  incorrectFeedback: string;
}> = {
  'type1': {
    label: 'Type I: Fire-Resistive',
    description: 'Noncombustible construction with two- to three-hour fire ratings on major structural elements. Designed to confine fire and delay collapse; heat and smoke spread remain key concerns.',
    correctFeedback: `Correct. Type I construction is fire-resistive. Structural elements are made of noncombustible materials such as reinforced concrete and protected steel, with two- to three-hour fire resistance ratings.

These buildings are designed to confine fire to a single compartment, making collapse unlikely in the early stages of a fire. However, heat buildup and smoke movement remain significant concerns.`,
    incorrectFeedback: `Not quite. The correct answer is Type I: Fire-resistive construction.

These buildings are made from noncombustible materials, usually reinforced concrete and protected steel, with two- to three-hour fire-resistance ratings on their primary structural frame.

Type I structures are designed to confine a fire to one area and prevent collapse during the early stages of an incident. While the structural protection is excellent, remember that heat and smoke can still move freely through shafts and ceiling spaces, creating visibility and ventilation challenges for crews.`
  },
  'type2': {
    label: 'Type II: Noncombustible (Limited Fire Resistance)',
    description: 'Uses steel or concrete with limited fire resistance (about 1 hour). Common in warehouses and retail buildings; unprotected steel can fail quickly under heat.',
    correctFeedback: `Right. Type II construction also uses noncombustible materials, but the fire resistance ratings are lower, usually one hour or less.

You'll see this type in many commercial structures, such as warehouses or newer retail stores. The main hazard is the unprotected steel framing, which can fail quickly when exposed to high heat.`,
    incorrectFeedback: `That's not quite right. This description fits Type II: Noncombustible construction.

Like Type I, these buildings use noncombustible materials such as steel or concrete, but their fire-resistance ratings are lower, typically about one hour.

You'll find many modern commercial or warehouse structures built this way. The danger is the unprotected steel framing, which can lose strength rapidly when exposed to high temperatures. Recognizing Type II construction helps you anticipate early collapse potential when fire impinges on steel members.`
  },
  'type3': {
    label: 'Type III: Ordinary Construction',
    description: 'Noncombustible exterior walls with combustible interior framing. Found in older "Main Street" buildings; concealed voids can hide fire spread.',
    correctFeedback: `Correct. Type III: Ordinary Construction, combines noncombustible exterior walls with combustible interior components.

Many older downtown or "Main Street" buildings fall into this category. Watch for concealed spaces in floor and ceiling voids where fire can spread undetected.`,
    incorrectFeedback: `Close, but this one is Type III: Ordinary construction.

In these buildings, the exterior walls are noncombustible, often brick or block, while the interior elements, including floors, roof, and structural members, may be combustible wood.

They're common in older downtown business districts. The primary hazards are void spaces between walls and ceilings, where fire can travel unseen, and partial collapse of interior floors. Always look for concealed spaces that need to be opened up during overhaul or ventilation.`
  },
  'type4': {
    label: 'Type IV: Heavy Timber (Mill Construction)',
    description: 'Large-dimension wood or mass-timber framing with noncombustible walls. Charring slows failure, but radiant heat and fuel load are significant.',
    correctFeedback: `That's right. Type IV: Heavy Timber uses large-dimension wood members or mass timber combined with noncombustible exterior walls.

The heavy wood chars on the surface, which slows structural failure, but these buildings can still generate intense heat and require large water flows for extinguishment.`,
    incorrectFeedback: `Not exactly. This description actually matches Type IV: Heavy Timber construction.

These buildings use large-dimension wood members or mass-timber components with noncombustible exterior walls.

The heavy wood chars on the outside when exposed to fire, which slows structural failure, but the fuel load and radiant heat are significant. Fires in Type IV structures often require large water flows and careful monitoring of beam connections. When you identify this type during a pre-plan, note the size of structural members and any modern renovations that could alter performance.`
  },
  'type5': {
    label: 'Type V: Wood Frame (Combustible)',
    description: 'Combustible structural and wall materials throughout. Common in residential buildings; lightweight trusses can fail within minutes of fire exposure.',
    correctFeedback: `Correct. Type V construction uses combustible materials throughout, including structural framing, walls, and floors.

These are the most common residential buildings. They are lightweight, fast to build, and fast to burn. Modern lightweight trusses can fail in just a few minutes when exposed to fire.`,
    incorrectFeedback: `That's not correct. The right answer is Type V: Wood Frame, the most common combustible type.

Here, structural elements, exterior walls, and interior partitions are all made of combustible materials, usually lightweight wood framing.

This category includes most single-family homes, townhouses, and small apartments. These buildings can burn rapidly, and lightweight trusses may fail in just a few minutes when exposed to fire. Knowing that you're operating in a Type V structure should immediately heighten your awareness of collapse risk.`
  }
};
