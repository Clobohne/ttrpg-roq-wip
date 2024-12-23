import { Attributes } from "react";
import { ItemType } from "./Icharacter";

/**
 * Represents a skill tree (not implemented yet but can be expanded)
 */
export interface Skilltree {
    [key: string]: Skill; // Placeholder for skill tree data
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
    requirement?: Requirement; // Optional skill requirements
}

/**
 * Requirement to learn or use a skill, can be a stat, item, or combination
 */
export interface Requirement {
    id: string;
    stat?: StatRequirement; // Optional stat requirement (e.g., strength > 10)
    item?: ItemRequirement; // Optional item requirement (e.g., must have a sword)
}

/**
 * Stat requirement for a skill, such as strength or intelligence.
 */
export interface StatRequirement {
    stat: keyof Attributes; // The name of the stat (strength, agility, etc.)
    value: number; // The required value of the stat
}

/**
 * Item requirement for a skill, such as a specific item in inventory.
 */
export interface ItemRequirement {
    type: ItemType; // The type of item (weapon, armor, etc.)
    quantity: number; // Required quantity of the item
}
