import { jsPDF } from "jspdf";

const hasTreatment = (protocol, name) =>
    protocol.treatments?.includes(name);

const yesNo = (value) => (value ? "TAK" : "NIE");

export const generateProtocolPdfV2 = (protocol) => {
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const margin = 10;
    let y = 10;

    const cell = (x, y, w, h, text = "", options = {}) => {
        pdf.rect(x, y, w, h);

        pdf.setFontSize(options.fontSize || 8);

        if (options.bold) {
            pdf.setFont("helvetica", "bold");
        } else {
            pdf.setFont("helvetica", "normal");
        }

        const lines = pdf.splitTextToSize(String(text || ""), w - 4);

        pdf.text(lines, x + 2, y + 5);
    };

    const sectionHeader = (text, yPos) => {
        pdf.setFillColor(235, 235, 235);
        pdf.rect(margin, yPos, pageWidth - margin * 2, 7, "FD");
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(10);
        pdf.text(text, pageWidth / 2, yPos + 5, { align: "center" });
    };

    // HEADER
    cell(10, y, 50, 16, "Avi-Vet\nSERVICE", { bold: true, fontSize: 14 });

    cell(
        60,
        y,
        140,
        16,
        `PROTOKOL Z WYKONANIA USLUG I ZABIEGOW NR 2026 / ${protocol.protocolNumber || ""
        }`,
        { bold: true, fontSize: 10 }
    );

    y += 16;

    // TOP DATA TABLE
    cell(
        10,
        y,
        63,
        14,
        `Data i godzina\nprzyjecia zlecenia\n${protocol.orderDate || ""} ${protocol.orderTime || ""}`
    );

    cell(73, y, 127, 14, `Osoba zlecajaca\n${protocol.orderingPerson || ""}`);

    y += 14;

    // LEFT TREATMENTS + RIGHT FARM DATA
    const leftX = 10;
    const rightX = 83;
    const blockY = y;
    const blockH = 78;

    pdf.rect(leftX, blockY, 73, blockH);

    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");

    const treatments = [
        ["Szczepienie IM", "SZCZEPIENIE INIEKCYJNE DOMIESNIOWE I.M."],
        ["Szczepienie SC", "SZCZEPIENIE INIEKCYJNE PODSKORNE S.C."],
        ["Błona skrzydłowa", "SZCZEPIENIE INIEKCYJNE W BLONE SKRZYDLOWA W.W."],
        ["Kropla do oka", "SZCZEPIENIE W KROPLI DO OKA"],
        ["Spray", "SZCZEPIENIE SPRAY"],
        ["Deratyzacja", "DERATYZACJA"],
        ["Dezynfekcja", "DEZYNFEKCJA"],
        ["Dezynsekcja", "DEZYNSEKCJI"],
        ["Czyszczenie linii pojenia", "CZYSZCZENIE LINII POJENIA"],
        ["Inne", "INNE"],
    ];

    let ty = blockY + 6;

    treatments.forEach(([key, label]) => {
        const checked = hasTreatment(protocol, key) ? "X" : " ";
        const lines = pdf.splitTextToSize(`[${checked}] ${label}`, 64);
        pdf.text(lines, leftX + 3, ty);
        ty += lines.length * 4.2 + 2;
    });

    cell(rightX, blockY, 35, 14, "Data wykonania\nzabiegu");
    cell(118, blockY, 82, 14, protocol.executionDate || "");

    cell(rightX, blockY + 14, 35, 14, "Godziny wykonania\nzabiegu (od, do)");
    cell(118, blockY + 14, 82, 14, `${protocol.startTime || ""} - ${protocol.endTime || ""}`);

    cell(rightX, blockY + 28, 35, 16, "Wlasciciel /\nFerma");
    cell(118, blockY + 28, 82, 16, protocol.breeder || "");

    cell(rightX, blockY + 44, 35, 10, "Budynek\n(numer, opis)");
    cell(118, blockY + 44, 82, 10, protocol.building || "");

    cell(rightX, blockY + 54, 35, 24, "Wypelnione jesli\nzabieg dotyczy\nzwierzat");
    cell(118, blockY + 54, 27, 8, "Wiek zwierzat");
    cell(145, blockY + 54, 55, 8, protocol.animalAge || "");
    cell(118, blockY + 62, 27, 8, "Rodzaj zwierzat");
    cell(145, blockY + 62, 55, 8, protocol.animalType || "");
    cell(118, blockY + 70, 27, 8, "Ilosc zwierzat");
    cell(145, blockY + 70, 55, 8, protocol.animalCount || "");

    y += blockH;

    // PRODUCTS TABLE
    sectionHeader("ZASTOSOWANO NASTEPUJACE PREPARATY / SZCZEPIONKI / MATERIALY", y);
    y += 7;

    const cols = [
        [10, 18, "Nr dok.\nwydania"],
        [28, 55, "Nazwa\nOpakowanie"],
        [83, 30, "Seria"],
        [113, 30, "Data waznosci"],
        [143, 22, "Ilosc"],
        [165, 35, "Dawkowanie / metoda\nzastosowania"],
    ];

    cols.forEach(([x, w, label]) => cell(x, y, w, 10, label, { fontSize: 7 }));
    y += 10;

    const productRows = protocol.products?.length ? protocol.products : [{}];

    for (let i = 0; i < 6; i++) {
        const p = productRows[i] || {};

        cell(10, y, 18, 9, p.documentNumber || "");
        cell(28, y, 55, 9, p.name || "");
        cell(83, y, 30, 9, p.batch || "");
        cell(113, y, 30, 9, p.expiryDate || "");
        cell(143, y, 22, 9, p.quantity || "");
        cell(165, y, 35, 9, p.dosage || "");

        y += 9;
    }

    // BHP
    sectionHeader("Kontrolka zachowania warunkow BHP w trakcie wykonywania zabiegow", y);
    y += 7;

    cell(10, y, 150, 8, "Rodzaj wymogow", { bold: true });
    cell(160, y, 40, 8, "Kontrola", { bold: true });
    y += 8;

    const bhpRows = [
        ["Temperatura transportu preparatow", protocol.transportTemperature || "...... °C"],
        ["Zabiegi zostaly wykonane czystym wysterylizowanym sprzetem", yesNo(protocol.bhp?.sterileEquipment)],
        ["Osoby wykonujace zabiegi uzyly czystych fartuchow / kombinezonow oraz srodkow ochrony osobistej", yesNo(protocol.bhp?.protectiveClothing)],
        ["Miejsce pracy uporzadkowano, odpady zabezpieczono", yesNo(protocol.bhp?.wasteSecured)],
        ["Fartuchy / kombinezony zapakowano do foliowego worka i oznaczono BRUDNE", yesNo(protocol.bhp?.dirtyClothesPacked)],
    ];

    bhpRows.forEach(([label, value]) => {
        cell(10, y, 150, 8, label, { fontSize: 7 });
        cell(160, y, 40, 8, value, { fontSize: 8 });
        y += 8;
    });

    cell(10, y, 190, 10, `Uwagi dot. wykonania uslugi: ${protocol.notes || ""}`);
    y += 10;

    // SIGNATURES
    const signaturesY = y;

    const boxHeight = 64;

    const supervisorX = 10;
    const supervisorWidth = 50;

    const farmerX = 60;
    const farmerWidth = 50;

    const workersX = 110;
    const workersWidth = 90;

    cell(supervisorX, signaturesY, supervisorWidth, boxHeight, "");
    cell(farmerX, signaturesY, farmerWidth, boxHeight, "");
    cell(workersX, signaturesY, workersWidth, boxHeight, "");

    pdf.setFontSize(7);
    pdf.setFont("helvetica", "normal");

    // OPISY PODPISÓW U GÓRY
    pdf.text(["Podpis hodowcy lub osoby nadzorujacej", "szczepienie"], supervisorX + 6, signaturesY + 7);
    pdf.text(["Podpis Technika"], farmerX + 7, signaturesY + 7);

    // PODPISY
    if (protocol.workerSignature) {
        pdf.addImage(
            protocol.workerSignature,
            "PNG",
            supervisorX + 8,
            signaturesY + 20,
            34,
            14
        );
    }

    if (protocol.farmerSignature) {
        pdf.addImage(
            protocol.farmerSignature,
            "PNG",
            farmerX + 8,
            signaturesY + 20,
            34,
            14
        );
    }

    // LINIE POD PODPISAMI
    pdf.line(supervisorX + 8, signaturesY + 42, supervisorX + supervisorWidth - 8, signaturesY + 42);
    pdf.line(farmerX + 8, signaturesY + 42, farmerX + farmerWidth - 8, signaturesY + 42);

    // PRAWA KOLUMNA — wykonujący zabiegi
    pdf.text("Imiona, nazwiska wykonujacych zabiegi:", workersX + 3, signaturesY + 6);

    const workers = (protocol.workers || "")
        .split(",")
        .map((worker) => worker.trim())
        .filter(Boolean);

    // 18 osób: 9 po lewej, 9 po prawej
    for (let i = 0; i < 18; i++) {
        const worker = workers[i] || "................................";

        const columnX = i < 9 ? workersX + 4 : workersX + 47;
        const rowIndex = i < 9 ? i : i - 9;

        pdf.text(
            `${i + 1}. ${worker}`,
            columnX,
            signaturesY + 13 + rowIndex * 5
        );
    }

    window.open(pdf.output("bloburl"), "_blank");
};