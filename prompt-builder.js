/* Seller Notebook – Prompt builder.
   Builds a ready-to-copy AI prompt from what the visitor chooses and types.
   It runs only in the browser: nothing is sent anywhere and no AI is called.
   To change the wording of a prompt, edit PROMPT_TEMPLATES below.
   {platform}, {tone} and {facts} are filled in automatically. */

var PROMPT_TEMPLATES = {
  description:
    'You are helping me write a product description for my {platform} shop.\n\n' +
    'Product facts:\n{facts}\n\n' +
    'Write a product description that:\n' +
    '- starts with 1-2 sentences saying what the product is and why someone would want it\n' +
    '- lists the key details (materials, size, care, what\'s included) as short bullet points\n' +
    '- uses a {tone} tone\n' +
    '- is between 120 and 200 words\n\n' +
    'Rules:\n' +
    '- Use only the facts above. Do not invent materials, sizes, origins or features.\n' +
    '- If something important is missing, list it as a question at the end instead of guessing.\n' +
    '- No exaggerated claims like "best", "perfect" or "life-changing".',

  title:
    'Write 5 product title options for my {platform} listing.\n\n' +
    'Product facts:\n{facts}\n\n' +
    'Each title should:\n' +
    '- start with what the item is\n' +
    '- include the one or two details buyers are most likely to search for\n' +
    '- read naturally, with a {tone} feel\n' +
    '- fit the current title length limit of the place I sell\n\n' +
    'Rules:\n' +
    '- Use only the facts above.\n' +
    '- No keyword stuffing and no repeated words.\n' +
    '- After the titles, tell me in one line which one you would pick and why.',

  reply:
    'Help me reply to a customer message for my {platform} shop.\n\n' +
    'The situation and the customer\'s message (personal details removed):\n{facts}\n\n' +
    'Write a reply that:\n' +
    '- uses a {tone} tone\n' +
    '- is 3-6 sentences long\n' +
    '- answers the customer\'s main point first\n\n' +
    'Rules:\n' +
    '- Never promise refunds, replacements, discounts or dates unless I wrote that I will offer them.\n' +
    '- Don\'t blame the customer, the courier or anyone else.\n' +
    '- If you need information you don\'t have, write [ASK ME] instead of guessing.',

  social:
    'Write 3 short social media posts to promote a product from my {platform} shop.\n\n' +
    'Product facts:\n{facts}\n\n' +
    'Each post should:\n' +
    '- be under 60 words\n' +
    '- use a {tone} tone\n' +
    '- end with one clear call to action\n' +
    '- use at most 3 hashtags\n\n' +
    'Rules:\n' +
    '- Use only the facts above. No claims I didn\'t give you.\n' +
    '- Make the three posts different: one about the product, one about who it\'s for, one about a moment of using it.'
};

var FACTS_PLACEHOLDERS = {
  description: '[what it is, materials, size, colours, care, what\'s included, who it\'s for]',
  title: '[what it is, materials, size, colour, style, who it\'s for]',
  reply: '[what happened with the order, the customer\'s message, and what you will offer]',
  social: '[what it is, what makes it special, who it\'s for, price or offer if you want to mention it]'
};

(function () {
  document.querySelectorAll('[data-prompt-builder]').forEach(setUpPromptBuilder);

  function setUpPromptBuilder(builder) {
    var platformField = builder.querySelector('[name="platform"]');
    var taskField = builder.querySelector('[name="task"]');
    var toneField = builder.querySelector('[name="tone"]');
    var factsField = builder.querySelector('[name="facts"]');
    var output = builder.querySelector('[data-prompt-output]');
    var copyButton = builder.querySelector('[data-prompt-copy]');

    function updatePrompt() {
      var task = taskField.value;
      var facts = factsField.value.trim() || FACTS_PLACEHOLDERS[task];
      output.textContent = PROMPT_TEMPLATES[task]
        .split('{platform}').join(platformField.value)
        .split('{tone}').join(toneField.value)
        .split('{facts}').join(facts);
      factsField.placeholder = FACTS_PLACEHOLDERS[task].replace(/^\[|\]$/g, '');
    }

    [platformField, taskField, toneField].forEach(function (field) {
      field.addEventListener('change', updatePrompt);
    });
    factsField.addEventListener('input', updatePrompt);

    copyButton.addEventListener('click', function () {
      navigator.clipboard.writeText(output.textContent).then(function () {
        copyButton.textContent = 'Copied!';
        setTimeout(function () { copyButton.textContent = 'Copy prompt'; }, 1500);
      });
    });

    updatePrompt();
  }
})();
