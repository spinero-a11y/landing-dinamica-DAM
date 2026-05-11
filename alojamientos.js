const alojamientos = [
    // MADRID
    { nombre: "Hotel Gran Vía", tipo: "Hotel", precio: 140, img: "https://images.unsplash.com/photo-1541123356219-284ebe98ae3b?w=500", ciudad: "Madrid", pais: "España", extras: ["wifi", "desayuno", "gym", "ac"] },
    { nombre: "Hostal Sol", tipo: "Albergue", precio: 35, img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500", ciudad: "Madrid", pais: "España", extras: ["wifi", "ac"] },
    { nombre: "Skyline Apartments", tipo: "Apartamento", precio: 110, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500", ciudad: "Madrid", pais: "España", extras: ["wifi", "piscina", "parking"] },
    { nombre: "Villa de la Moraleja", tipo: "Villa", precio: 450, img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500", ciudad: "Madrid", pais: "España", extras: ["piscina", "wifi", "desayuno", "cena", "gym", "parking"] },

    // BARCELONA
    { nombre: "Hotel Plaza Central", tipo: "Hotel", precio: 120, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500", ciudad: "Barcelona", pais: "España", extras: ["wifi", "gym", "desayuno", "parking"] },
    { nombre: "Be Sound Hostel", tipo: "Albergue", precio: 30, img: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=500", ciudad: "Barcelona", pais: "España", extras: ["wifi"] },
    { nombre: "Apartamentos Gaudí", tipo: "Apartamento", precio: 95, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500", ciudad: "Barcelona", pais: "España", extras: ["wifi", "ac"] },
    { nombre: "Villa del Mar", tipo: "Villa", precio: 520, img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", ciudad: "Barcelona", pais: "España", extras: ["piscina", "wifi", "desayuno", "cena", "parking"] },

    // PARÍS
    { nombre: "Hotel Champs-Élysées", tipo: "Hotel", precio: 180, img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500", ciudad: "París", pais: "Francia", extras: ["wifi", "desayuno", "ac"] },
    { nombre: "St Christopher's Inn", tipo: "Albergue", precio: 40, img: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?w=500", ciudad: "París", pais: "Francia", extras: ["wifi", "cena"] },
    { nombre: "Le Marais Loft", tipo: "Apartamento", precio: 150, img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500", ciudad: "París", pais: "Francia", extras: ["wifi", "parking"] },
    { nombre: "Villa Seine Luxe", tipo: "Villa", precio: 700, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500", ciudad: "París", pais: "Francia", extras: ["piscina", "wifi", "gym", "cena", "ac"] },

    // LONDRES
    { nombre: "Tower Boutique Hotel", tipo: "Hotel", precio: 170, img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500", ciudad: "Londres", pais: "Reino Unido", extras: ["wifi", "desayuno", "gym"] },
    { nombre: "The London Bunk", tipo: "Albergue", precio: 45, img: "https://destinia.com/guides/wp-content/uploads/2022/12/wombat-s-city-bed-breakfast-backpackers-hostels-london.webp", ciudad: "Londres", pais: "Reino Unido", extras: ["wifi"] },
    { nombre: "Soho Living", tipo: "Apartamento", precio: 160, img: "https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2024/09/05/3fb396e1914b4910aa6c93a9a07a0ebf_iStock-1073665152_RET.jpg", ciudad: "Londres", pais: "Reino Unido", extras: ["wifi", "ac"] },
    { nombre: "Regent's Park Estate", tipo: "Villa", precio: 850, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500", ciudad: "Londres", pais: "Reino Unido", extras: ["piscina", "parking", "gym", "cena"] },

    // FRANKFURT
    { nombre: "Skyline Financial Hotel", tipo: "Hotel", precio: 145, img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500", ciudad: "Frankfurt", pais: "Alemania", extras: ["wifi", "desayuno", "gym"] },
    { nombre: "Main River Hostel", tipo: "Albergue", precio: 38, img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500", ciudad: "Frankfurt", pais: "Alemania", extras: ["wifi"] },
    { nombre: "Altstadt Modern Loft", tipo: "Apartamento", precio: 130, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500", ciudad: "Frankfurt", pais: "Alemania", extras: ["wifi", "ac"] },
    { nombre: "Taunus Mountain Villa", tipo: "Villa", precio: 720, img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500", ciudad: "Frankfurt", pais: "Alemania", extras: ["piscina", "parking", "cena", "gym"] },

    // NEW YORK
    { nombre: "Manhattan Sky View", tipo: "Hotel", precio: 210, img: "https://images.unsplash.com/photo-1571011270518-2ad1d19ca41c?w=500", ciudad: "Nueva York", pais: "EE.UU", extras: ["wifi", "desayuno", "gym"] },
    { nombre: "Brooklyn Central Hostel", tipo: "Albergue", precio: 65, img: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=500", ciudad: "Nueva York", pais: "EE.UU", extras: ["wifi"] },
    { nombre: "Chelsea Loft Studio", tipo: "Apartamento", precio: 190, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500", ciudad: "Nueva York", pais: "EE.UU", extras: ["wifi", "ac"] },
    { nombre: "Hamptons Luxury Retreat", tipo: "Villa", precio: 1250, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500", ciudad: "Nueva York", pais: "EE.UU", extras: ["piscina", "wifi", "cena", "gym"] },

    // ROMA
    { nombre: "Hotel Imperial Pantheon", tipo: "Hotel", precio: 155, img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500", ciudad: "Roma", pais: "Italia", extras: ["wifi", "desayuno", "gym"] },
    { nombre: "Colosseum Backpackers", tipo: "Albergue", precio: 35, img: "https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?w=500", ciudad: "Roma", pais: "Italia", extras: ["wifi"] },
    { nombre: "Trastevere Terrace", tipo: "Apartamento", precio: 140, img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500", ciudad: "Roma", pais: "Italia", extras: ["wifi", "ac"] },
    { nombre: "Villa Appia Antica", tipo: "Villa", precio: 920, img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=500", ciudad: "Roma", pais: "Italia", extras: ["piscina", "parking", "cena", "gym"] },

    // SANTORINI
    { nombre: "Blue Dome Suites", tipo: "Hotel", precio: 250, img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500", ciudad: "Santorini", pais: "Grecia", extras: ["piscina", "wifi", "desayuno", "ac"] },
    { nombre: "Oia Backpackers", tipo: "Albergue", precio: 50, img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500", ciudad: "Santorini", pais: "Grecia", extras: ["wifi", "piscina"] },
    { nombre: "Aegean Apartment", tipo: "Apartamento", precio: 130, img: "https://images.unsplash.com/photo-1515404929826-76fff9fef204?w=500", ciudad: "Santorini", pais: "Grecia", extras: ["wifi", "parking"] },
    { nombre: "Villa Oia Sunset", tipo: "Villa", precio: 600, img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=500", ciudad: "Santorini", pais: "Grecia", extras: ["piscina", "wifi", "cena", "gym"] },

    // VALENCIA
    { nombre: "Marina Beach Hotel", tipo: "Hotel", precio: 110, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500", ciudad: "Valencia", pais: "España", extras: ["wifi", "desayuno", "ac", "parking"] },
    { nombre: "Urban Youth Hostel", tipo: "Albergue", precio: 25, img: "https://images.unsplash.com/photo-1544097691-236b3283a00b?w=500", ciudad: "Valencia", pais: "España", extras: ["wifi"] },
    { nombre: "Turia Gardens Flat", tipo: "Apartamento", precio: 85, img: "https://images.unsplash.com/photo-1499955085172-a104c9463ece?w=500", ciudad: "Valencia", pais: "España", extras: ["wifi", "ac"] },
    { nombre: "Villa Malvarrosa", tipo: "Villa", precio: 300, img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500", ciudad: "Valencia", pais: "España", extras: ["piscina", "parking", "desayuno"] },

    // PEKÍN
    { nombre: "Great Wall Palace", tipo: "Hotel", precio: 190, img: "https://pix10.agoda.net/hotelImages/491/4913448/4913448_18041613260063430086.jpg?ca=0&ce=1&s=1024x768", ciudad: "Pekín", pais: "China", extras: ["wifi", "desayuno", "gym"] },
    { nombre: "Beijing Dragon Hostel", tipo: "Albergue", precio: 20, img: "https://images.unsplash.com/photo-1521783988139-89397d761dce?w=500", ciudad: "Pekín", pais: "China", extras: ["wifi"] },
    { nombre: "Forbidden City Loft", tipo: "Apartamento", precio: 80, img: "https://tse3.mm.bing.net/th/id/OIP.qsGNjhYN5fHTJM2Seds7nwHaES?rs=1&pid=ImgDetMain&o=7&rm=3", ciudad: "Pekín", pais: "China", extras: ["wifi", "ac"] },
    { nombre: "Summer Palace Villa", tipo: "Villa", precio: 400, img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500", ciudad: "Pekín", pais: "China", extras: ["piscina", "parking", "gym", "desayuno", "cena"] }
];