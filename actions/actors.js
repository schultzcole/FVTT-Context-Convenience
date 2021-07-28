/**
 * Actor Actions
 */

/**
 * Shows the token configuration dialog for a given actor's prototype token.
 * @param {string} actorId the id of the actor to show the prototype token for
 */
export function configurePrototypeTokenForActor(actorId) {
    const actor = game.actors.get(actorId);
    const token = actor || new Token(actor.data.token);
    new TokenConfig(token).render(true);
}
