import { jsPDF } from "jspdf";

const removePolishChars = (text = "") =>
    String(text)
        .replaceAll("ą", "a")
        .replaceAll("ć", "c")
        .replaceAll("ę", "e")
        .replaceAll("ł", "l")
        .replaceAll("ń", "n")
        .replaceAll("ó", "o")
        .replaceAll("ś", "s")
        .replaceAll("ź", "z")
        .replaceAll("ż", "z")
        .replaceAll("Ą", "A")
        .replaceAll("Ć", "C")
        .replaceAll("Ę", "E")
        .replaceAll("Ł", "L")
        .replaceAll("Ń", "N")
        .replaceAll("Ó", "O")
        .replaceAll("Ś", "S")
        .replaceAll("Ź", "Z")
        .replaceAll("Ż", "Z");

const hasTreatment = (protocol, name) =>
    protocol.treatments?.includes(name);

const yesNo = (value) => (value ? "TAK" : "NIE");

export const generateProtocolPdfV2 = (protocol) => {
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const margin = 10;
    let y = 10;

    const cell = (x, yPosition, width, height, text = "", options = {}) => {
        pdf.rect(x, yPosition, width, height);

        pdf.setFontSize(options.fontSize || 8);
        pdf.setFont(
            "helvetica",
            options.bold ? "bold" : "normal"
        );

        const safeText = removePolishChars(text);
        const lines = pdf.splitTextToSize(
            safeText,
            width - 4
        );

        pdf.text(lines, x + 2, yPosition + 5);
    };

    const sectionHeader = (text, yPosition) => {
        pdf.setFillColor(235, 235, 235);
        pdf.rect(
            margin,
            yPosition,
            pageWidth - margin * 2,
            7,
            "FD"
        );

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);

        pdf.text(
            removePolishChars(text),
            pageWidth / 2,
            yPosition + 5,
            { align: "center" }
        );
    };

    // NAGŁÓWEK
    cell(
        10,
        y,
        50,
        16,
        "Avi-Vet\nSERVICE",
        {
            bold: true,
            fontSize: 14,
        }
    );

    cell(
        60,
        y,
        140,
        16,
        `PROTOKOL Z WYKONANIA USLUG I ZABIEGOW NR 2026 / ${protocol.protocolNumber || ""
        }`,
        {
            bold: true,
            fontSize: 10,
        }
    );

    y += 16;

    // DANE ZLECENIA
    cell(
        10,
        y,
        63,
        14,
        `Data i godzina\nprzyjecia zlecenia\n${protocol.orderDate || ""
        } ${protocol.orderTime || ""}`
    );

    cell(
        73,
        y,
        127,
        14,
        `Osoba zlecajaca\n${protocol.orderingPerson || ""}`
    );

    y += 14;

    // ZABIEGI + DANE FERMY
    const leftX = 10;
    const rightX = 83;
    const blockY = y;
    const blockH = 78;

    pdf.rect(leftX, blockY, 73, blockH);

    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");

    const treatments = [
        [
            "Szczepienie IM",
            "SZCZEPIENIE INIEKCYJNE DOMIESNIOWE I.M.",
        ],
        [
            "Szczepienie SC",
            "SZCZEPIENIE INIEKCYJNE PODSKORNE S.C.",
        ],
        [
            "Błona skrzydłowa",
            "SZCZEPIENIE INIEKCYJNE W BLONE SKRZYDLOWA W.W.",
        ],
        [
            "Kropla do oka",
            "SZCZEPIENIE W KROPLI DO OKA",
        ],
        [
            "Spray",
            "SZCZEPIENIE SPRAY",
        ],
        [
            "Deratyzacja",
            "DERATYZACJA",
        ],
        [
            "Dezynfekcja",
            "DEZYNFEKCJA",
        ],
        [
            "Dezynsekcja",
            "DEZYNSEKCJA",
        ],
        [
            "Czyszczenie linii pojenia",
            "CZYSZCZENIE LINII POJENIA",
        ],
        [
            "Inne",
            "INNE",
        ],
    ];

    let treatmentY = blockY + 6;

    treatments.forEach(([key, label]) => {
        const checked = hasTreatment(protocol, key)
            ? "X"
            : " ";

        const lines = pdf.splitTextToSize(
            `[${checked}] ${removePolishChars(label)}`,
            64
        );

        pdf.text(
            lines,
            leftX + 3,
            treatmentY
        );

        treatmentY += lines.length * 4.2 + 2;
    });

    cell(
        rightX,
        blockY,
        35,
        14,
        "Data wykonania\nzabiegu"
    );

    cell(
        118,
        blockY,
        82,
        14,
        protocol.executionDate || ""
    );

    cell(
        rightX,
        blockY + 14,
        35,
        14,
        "Godziny wykonania\nzabiegu (od, do)"
    );

    cell(
        118,
        blockY + 14,
        82,
        14,
        `${protocol.startTime || ""} - ${protocol.endTime || ""
        }`
    );

    cell(
        rightX,
        blockY + 28,
        35,
        16,
        "Wlasciciel /\nFerma"
    );

    cell(
        118,
        blockY + 28,
        82,
        16,
        protocol.breeder || ""
    );

    cell(
        rightX,
        blockY + 44,
        35,
        10,
        "Budynek\n(numer, opis)"
    );

    cell(
        118,
        blockY + 44,
        82,
        10,
        protocol.building || ""
    );

    cell(
        rightX,
        blockY + 54,
        35,
        24,
        "Wypelnione jesli\nzabieg dotyczy\nzwierzat"
    );

    cell(
        118,
        blockY + 54,
        27,
        8,
        "Wiek zwierzat"
    );

    cell(
        145,
        blockY + 54,
        55,
        8,
        protocol.animalAge || ""
    );

    cell(
        118,
        blockY + 62,
        27,
        8,
        "Rodzaj zwierzat"
    );

    cell(
        145,
        blockY + 62,
        55,
        8,
        protocol.animalType || ""
    );

    cell(
        118,
        blockY + 70,
        27,
        8,
        "Ilosc zwierzat"
    );

    cell(
        145,
        blockY + 70,
        55,
        8,
        protocol.animalCount || ""
    );

    y += blockH;

    // PREPARATY
    sectionHeader(
        "ZASTOSOWANO NASTEPUJACE PREPARATY / SZCZEPIONKI / MATERIALY",
        y
    );

    y += 7;

    const columns = [
        [10, 18, "Nr dok.\nwydania"],
        [28, 55, "Nazwa\nOpakowanie"],
        [83, 30, "Seria"],
        [113, 30, "Data waznosci"],
        [143, 22, "Ilosc"],
        [
            165,
            35,
            "Dawkowanie / metoda\nzastosowania",
        ],
    ];

    columns.forEach(([x, width, label]) => {
        cell(
            x,
            y,
            width,
            10,
            label,
            { fontSize: 7 }
        );
    });

    y += 10;

    const productRows =
        protocol.products?.length
            ? protocol.products
            : [{}];

    for (let index = 0; index < 6; index += 1) {
        const product = productRows[index] || {};

        cell(
            10,
            y,
            18,
            9,
            product.documentNumber || ""
        );

        cell(
            28,
            y,
            55,
            9,
            product.name || ""
        );

        cell(
            83,
            y,
            30,
            9,
            product.batch || ""
        );

        cell(
            113,
            y,
            30,
            9,
            product.expiryDate || ""
        );

        cell(
            143,
            y,
            22,
            9,
            product.quantity || ""
        );

        cell(
            165,
            y,
            35,
            9,
            product.dosage || ""
        );

        y += 9;
    }

    // BHP
    sectionHeader(
        "Kontrolka zachowania warunkow BHP w trakcie wykonywania zabiegow",
        y
    );

    y += 7;

    cell(
        10,
        y,
        150,
        8,
        "Rodzaj wymogow",
        { bold: true }
    );

    cell(
        160,
        y,
        40,
        8,
        "Kontrola",
        { bold: true }
    );

    y += 8;

    const bhpRows = [
        [
            "Temperatura transportu preparatow",
            protocol.transportTemperature || "2-8°C",
        ],
        [
            "Zabiegi zostaly wykonane czystym wysterylizowanym sprzetem",
            yesNo(protocol.bhp?.sterileEquipment),
        ],
        [
            "Osoby wykonujace zabiegi uzyly czystych fartuchow / kombinezonow oraz srodkow ochrony osobistej",
            yesNo(protocol.bhp?.protectiveClothing),
        ],
        [
            "Miejsce pracy uporzadkowano, odpady zabezpieczono",
            yesNo(protocol.bhp?.wasteSecured),
        ],
        [
            "Fartuchy / kombinezony zapakowano do foliowego worka i oznaczono BRUDNE",
            yesNo(protocol.bhp?.dirtyClothesPacked),
        ],
    ];

    bhpRows.forEach(([label, value]) => {
        cell(
            10,
            y,
            150,
            8,
            label,
            { fontSize: 7 }
        );

        cell(
            160,
            y,
            40,
            8,
            value,
            { fontSize: 8 }
        );

        y += 8;
    });

    cell(
        10,
        y,
        190,
        10,
        `Uwagi dot. wykonania uslugi: ${protocol.notes || ""
        }`
    );

    y += 10;

    // PODPISY I OSOBY WYKONUJĄCE
    const signaturesY = y;
    const boxHeight = 64;

    const supervisorX = 10;
    const supervisorWidth = 50;

    const farmerX = 60;
    const farmerWidth = 50;

    const workersX = 110;
    const workersWidth = 90;

    cell(
        supervisorX,
        signaturesY,
        supervisorWidth,
        boxHeight,
        ""
    );

    cell(
        farmerX,
        signaturesY,
        farmerWidth,
        boxHeight,
        ""
    );

    cell(
        workersX,
        signaturesY,
        workersWidth,
        boxHeight,
        ""
    );

    pdf.setFontSize(7);
    pdf.setFont("helvetica", "normal");

    // OPISY PODPISÓW
    pdf.text(
        [
            "Podpis hodowcy lub osoby",
            "upowaznionej",
        ],
        supervisorX + 5,
        signaturesY + 7
    );

    pdf.text(
        "Podpis technika",
        farmerX + 12,
        signaturesY + 7
    );

    // PODPIS HODOWCY
    if (protocol.farmerSignature) {
        pdf.addImage(
            protocol.farmerSignature,
            "PNG",
            supervisorX + 7,
            signaturesY + 20,
            34,
            14
        );
    }

    // PODPIS TECHNIKA
    if (protocol.workerSignature) {
        pdf.addImage(
            protocol.workerSignature,
            "PNG",
            farmerX + 8,
            signaturesY + 20,
            34,
            14
        );
    }

    // LINIE POD PODPISAMI
    pdf.line(
        supervisorX + 8,
        signaturesY + 42,
        supervisorX + supervisorWidth - 8,
        signaturesY + 42
    );

    pdf.line(
        farmerX + 8,
        signaturesY + 42,
        farmerX + farmerWidth - 8,
        signaturesY + 42
    );

    // OSOBY WYKONUJĄCE ZABIEG
    pdf.text(
        "Imiona, nazwiska wykonujacych zabiegi:",
        workersX + 3,
        signaturesY + 6
    );

    const workers = Array.isArray(protocol.workers)
        ? protocol.workers
            .map((worker) => String(worker).trim())
            .filter(Boolean)
        : String(protocol.workers || "")
            .split(",")
            .map((worker) => worker.trim())
            .filter(Boolean);

    for (let index = 0; index < 18; index += 1) {
        const worker =
            workers[index] ||
            "................................";

        const columnX =
            index < 9
                ? workersX + 4
                : workersX + 47;

        const rowIndex =
            index < 9
                ? index
                : index - 9;

        pdf.text(
            `${index + 1}. ${removePolishChars(worker)}`,
            columnX,
            signaturesY + 13 + rowIndex * 5
        );
    }

    const isMobile =
        /Android|iPhone|iPad|iPod/i.test(
            navigator.userAgent
        );

    const safeProtocolNumber = String(
        protocol.protocolNumber || Date.now()
    ).replaceAll("/", "-");

    if (isMobile) {
        pdf.save(
            `protokol-${safeProtocolNumber}.pdf`
        );
    } else {
        window.open(
            pdf.output("bloburl"),
            "_blank"
        );
    }
};