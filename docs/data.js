/* ==========================================================
   PROJECT DATA
   Edit this file to add / change projects.

   Fields:
     id    unique slug used in the URL (#/project/<id>)
     n     project name
     t     type (shown under the name)
     k     stack / keywords (first 3 show on the card)
     s     one-line summary
     h     detail bullets
     img   (optional) single cover image, relative path
     imgs  (optional) slideshow: [{ src, cap }, ...]
   ========================================================== */

const PROJECTS = [
  {
    id: "jupiter",
    n: "Jupiter",
    t: "3D concept visualization",
    k: ["Three.js", "JavaScript", "STL export"],
    s: "An interactive 3D browser visualization of a concept hybrid VTOL and supersonic craft, refined through many design iterations.",
    h: [
      "Real-time 3D model rendered in the browser",
      "Iterated repeatedly on the shape of the craft",
      "STL export so the design can move into CAD"
    ]
  },

  {
    id: "magazine",
    n: "Donovance Magazine",
    t: "Fashion magazine",
    k: ["Editorial layout", "Photo editing", "Styling"],
    demo: "Magazine.html",
    img: "magazine.png",   // save your cover next to index.html with this name
    s: "A fashion magazine issue built around my own looks: monochrome, vintage, streetwear and gothic style, closing with a manifesto on presence over noise.",
    h: [
      "Editorial spreads: Rugged Silence, Dream, What's my style?, Be you",
      "Monochrome edits with red accents, torn-paper borders and film-poster treatments",
      "Style guides on vintage, streetwear, gothic and monochrome, plus a photo editing guide",
      "Ends with an archive page and my Instagram, @donovance_",
      "Download at linktr.ee/donovance"
    ]
  },

  {
    id: "assistant",
    n: "AI Desktop Assistant",
    t: "Windows desktop app",
    k: ["Rust", "JavaScript", "OpenRouter API", "Claude Sonet-5, Claude Haiku 4.5, NVIDIA nemotron 3 Ultra 550B :Free"],
    demo: "demo.html",
    imgs: [
      { src: "image.png",  cap: "expanded island" },
      { src: "image1.png", cap: "collapsed" },
      { src: "image2.png", cap: "compact with clock" }
      
    ],
    s: "A desktop AI assistant built from scratch, with an animated face that lives on the center top of your desktop screen and runs simple tasks for you.",
    h: [
      "Framed animated island",
      "Tool calling: launches apps, sets timers, opens URLs, sends emails, sends Whatsapp messages for personal numbers",
      "OpenRouter backend that supports both paid per hour and free models"
    ]
  },

  {
    id: "tenis",
    n: "Tenis UFMS",
    t: "Coaching program",
    k: ["PowerPoint", "Microsoft Forms", "Power Automate", "OneDrive", "WhatsApp"],
    s: "The instructional and administrative system behind my tennis coaching at UFMS, built to run in Portuguese and English on court.",
    h: [
      "Bilingual welcome messages, class scripts and grip references",
      "Beginner 7-day schedule",
      "Attendance automation with excel Forms, Power Automate and OneDrive",
      "WhatsApp group and mail-merge workflows"
    ]
  },

  

  {
    id: "minecraft",
    n: "Minecraft Channel",
    t: "YouTube content",
    k: ["YouTube", "Video editing"],
    s: "A Minecraft channel with calm-energy, funny videos.",
    h: [
      "10 to 20+ minute episodes",
      "Mix of already-built and live-recorded footage"
    ]
  },

  


  {
    id: "websites",
    n: "Websites Linked to my different projects Development",
    t: "Donlabs and Projects",
    k: ["donlabs.lat", "techturtles.space", "coraçoes.lat"],
    s: "A collection of websites linked to different projects I've done under Donlabs",
    demo: "donlabs.lat",
    h: [
      "Donlabs: A website for my company",
      "Tech Turtles: A website for my independent tech projects and tutorials",
      "Coraçoes: A website for my art and design projects"
    ]
  }
  
];



  

