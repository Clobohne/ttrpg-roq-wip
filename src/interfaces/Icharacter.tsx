/**
 * Base attributes for any character, regardless of type.
 */
export interface BaseCharacter {
    id: string; // Unique identifier for the character
    name: string; // Name of the character
    health: number; // Current health points
    maxHealth: number; // Maximum health points
    level: number; // Character level
    attributes: Attributes; // Core attributes
    inventory: InventoryItem[]; // List of inventory items
}

/**
 * Attributes defining the character's capabilities.
 */
export interface Attributes {
    strength: number; // Physical power
    agility: number; // Speed and dexterity
    intelligence: number; // Magical or intellectual ability
    endurance: number; // Stamina and resilience
    charisma?: number; // Optional: Persuasive or social skill
}

/**
 * An item that can be stored in the character's inventory.
 */
export interface InventoryItem {
    id: string; // Unique identifier for the item
    name: string; // Name of the item
    type: ItemType; // Type of item (weapon, armor, potion, etc.)
    description?: string; // Optional description of the item
    quantity: number; // Number of items in the stack
}

export interface Buff {
    id: string;
    name: string;
    description: string;
    duration: number;
    statModifiers: Partial<Attributes>;
}

/**
 * Enum for inventory item types. LIMIT THE CHOICES of TYPE!!!!!
 */
export enum ItemType {
    Weapon = "Weapon",
    Armor = "Armor",
    Potion = "Potion",
    Miscellaneous = "Miscellaneous",
}

/**
 * Specialized interface for player-controlled characters.
 */
export interface PlayerCharacter extends BaseCharacter {
    experience: number; // Current experience points
    experienceToNextLevel: number; // Points needed for the next level
    skills: Skill[]; // List of learned skills
}

/**
 * Specialized interface for non-player characters.
 */
export interface NonPlayerCharacter extends BaseCharacter {
    isHostile: boolean; // Whether the NPC is hostile to the player
    dialogue?: string[]; // Optional list of dialogue lines
    lootTable?: LootTable; // Optional loot table for items dropped on defeat
}

/**
 * A skill that a player character can learn or use.
 */
export interface Skill {
    id: string; // Unique identifier for the skill
    name: string; // Name of the skill
    description: string; // Description of the skill
    manaCost: number; // Mana cost to use the skill
    cooldown: number; // Cooldown time in seconds
}

/**
 * Loot table defining the drops for an NPC.
 */
export interface LootTable {
    items: LootItem[]; // List of possible loot items
    gold: number; // Gold dropped by the NPC
}

/**
 * Individual loot item in a loot table.
 */
export interface LootItem {
    itemId: string; // ID corresponding to an inventory item
    dropChance: number; // Percentage chance to drop
    quantity: number; // Quantity of the item
}
