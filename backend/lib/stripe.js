import Stripe from "stripe";
import envars from "./enVars.js";

export const stripe = new Stripe(envars.stripe_secret_key);
