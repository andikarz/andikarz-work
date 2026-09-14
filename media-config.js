/*
 * EDIT FOTO DI FILE INI. Semua src dihitung dari folder utama website,
 * termasuk saat dibuka dari halaman projects/.../index.html.
 * src: "" = placeholder. enabled: false = sembunyikan item/grup.
 * Baca PHOTO_GUIDE.md untuk contoh mengganti dan menambah foto.
 */
window.PORTFOLIO_MEDIA = {
    // Naikkan versi saat mengganti gambar dengan nama file yang sama.
    assetVersion: "photos-1",
    profile: {
        enabled: true,
        src: "assets/photos/profile/andika.jpg", // Contoh: "assets/photos/profile/andika.webp"
        alt: "Portrait of Andika Rizki Putra Pamungkas",
        title: "Andika Rizki Putra Pamungkas",
        caption: "A little more about the person behind the projects.",
        placeholder: "Profile photo",
        position: "40% 10%", // Posisi crop: horizontal vertikal.
        fit: "cover" // cover untuk foto, contain untuk screenshot.
    },
    galleries: {
        "experience-rucika": {
            enabled: true,
            title: "In the field",
            description: "Internship documentation at PT Rucika.",
            items: [
                { src: "assets/photos/rucika/foto-rucika-01.jpeg", alt: "Andika during the Rucika internship", title: "On the production floor", caption: "Internship photo — to be added.", placeholder: "Internship photo", position: "50% 50%", fit: "cover" },
                { src: "assets/photos/rucika/foto-rucika-02.jpeg", alt: "Industrial monitoring activities during the internship", title: "Working with industrial systems", caption: "Activity documentation — to be added.", placeholder: "Activity photo", position: "50% 50%", fit: "cover" }
            ]
        },
        "experience-research": {
            enabled: true,
            title: "Research moments",
            description: "A look at the work behind the research.",
            items: [
                { src: "assets/photos/research/research-01.png", alt: "Research team documentation", title: "Learning as a team", caption: "Research photo — to be added.", placeholder: "Research photo" }
            ]
        },
        "experience-teaching": {
            enabled: true,
            title: "In the lab",
            description: "Programming lab activities and practical sessions.",
            items: [
                { src: "assets/photos/teaching/asprak-01.jpg", alt: "Programming lab assistant activities", title: "Sharing through practice", caption: "Teaching photo — to be added.", placeholder: "Lab activity photo" }
            ]
        },
        "project-lora": {
            enabled: true,
            title: "",
            description: "",
            items: [
                { src: "assets/projects/lora/dataset-collapse.png", alt: "Dataset or preprocessing screenshot", title: "Preparing the data", caption: "Sample dataset for fine-tuning LoRA. Dataset is collected from Wattpad and then processed to fit the model's needs.", placeholder: "Dataset screenshot", fit: "contain" },
                { src: "assets/projects/lora/different.png", alt: "Model training or evaluation screenshot", title: "From experiment to result", caption: "Left image is the result of original SDXL. Right image is the result of fine-tuning with LoRA.", placeholder: "Experiment screenshot", fit: "contain" }
            ]
        },
        "project-vision": {
            enabled: true,
            title: "Behind the prototype",
            description: "The setup, test environment, and development process.",
            items: [
                { src: "", alt: "Actual injection molding camera setup", title: "The camera setup", caption: "Setup photo — to be added.", placeholder: "Setup photo" },
                { src: "", alt: "Actual camera prototype test screenshot", title: "Observing a test cycle", caption: "Testing documentation — to be added.", placeholder: "Test screenshot", fit: "contain" }
            ]
        },
        "project-opalpha": {
            enabled: true,
            title: "Feature documentation",
            description: "Screenshots of supported queries and documented behavior.",
            items: [
                { src: "", alt: "OpAlpha chatbot screenshot showing a supported query", title: "A supported question", caption: "Application screenshot — to be added.", placeholder: "Chat screenshot", fit: "contain" },
                { src: "", alt: "OpAlpha matching or fallback documentation", title: "Handling a different query", caption: "Matching documentation — to be added.", placeholder: "Feature screenshot", fit: "contain" }
            ]
        }
    }
};
