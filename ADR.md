# ADR

1. Server can be useful for privacy, e.g. API key won't be exposed to client. I selected Waku, but was also considering Next & Hono.

2. I can opt for either client-side or server-side solution. I decided to use React Server Components approach so React can shine with its full possibilities.

3. Since I'm using RSC, app should allow the user to submit the form WITH or WITHOUT JavaScript using RSC. Since there's not button for form submission present, I'll rely on default input behavior of pressing Enter key.

4. I'm keeping the external libraries usage to bare minimum - also regarding the CSS. Therefore, I decided to rely on currently-available CSS4 functionalities.

5. I see no reason to introduce any kind of form libraries as well, mostly because I'm able to limit invalid input possibilities through masking. Every invalid attempt will result in error. TODO: Add mask and handle errors!
