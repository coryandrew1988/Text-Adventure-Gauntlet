### Reliable facts about this project's internal APIs

A `system` object is used as a root to navigate the game state. This object seems a little like a god-object--a well-known anti-pattern. What differentiates this from a god-object enough to make it usable? It's just a root. It has few members itself.

Instead, a `system` object is a compendium, used to access less-godly objects than itself, which in turn are compendia of less-godly objects, maybe even bottom-level normal objects. Navigating a `system` should be as easy for the human mind as navigating a website.

For convenience, all methods on objects reachable through `system` will be pre-bound, so their references can be passed around freely. However, their paremeters might be allowed to change between versions (make a final decision on this). Since this is a possibility, these functions should not be called directly by functions like `Array.prototype.map`, which pass more than one argument. Junk arguments should be eliminated by wrapping calls to API functions.

----

