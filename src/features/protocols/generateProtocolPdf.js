import { jsPDF } from "jspdf";

const yesNo = (value) => (value ? "TAK" : "NIE");

export const generateProtocolPdf = (protocol) => {
    const pdf = new jsPDF();

    let y = 18;

    const addTitle = (text) => {
        pdf.setFontSize(16);
        pdf.text(text, 15, y);
        y += 10;
    };

    const addSection = (title) => {
        y += 6;
        pdf.setFontSize(13);
        pdf.text(title, 15, y);
        y += 6;
        pdf.line(15, y, 195, y);
        y += 8;
    };

    const addRow = (label, value) => {
        pdf.setFontSize(10);
        pdf.text(`${label}: ${value || "-"}`, 15, y);
        y += 7;
    };

    const checkPage = () => {
        if (y > 275) {
            pdf.addPage();
            y = 18;
        }
    };

    addTitle(`PROTOKOL ${protocol.protocolNumber || ""}`);

    addSection("DANE ZLECENIA");
    addRow("Data przyjecia", protocol.orderDate);
    addRow("Godzina przyjecia", protocol.orderTime);
    addRow("Osoba zlecajaca", protocol.orderingPerson);

    addSection("WYKONANIE ZABIEGU");
    addRow("Data wykonania", protocol.executionDate);
    addRow("Godzina od", protocol.startTime);
    addRow("Godzina do", protocol.endTime);
    addRow("Przyczyna zmiany daty", protocol.dateChangeReason);

    addSection("RODZAJ ZABIEGU");
    if (protocol.treatments?.length) {
        protocol.treatments.forEach((item) => {
            checkPage();
            addRow("-", item);
        });
    } else {
        addRow("-", "Brak");
    }

    addSection("DANE HODOWCY / FERMY");
    addRow("Wlasciciel / ferma", protocol.breeder);
    addRow("Miejscowosc", protocol.city);
    addRow("Budynek", protocol.building);

    addSection("ZWIERZETA");
    addRow("Wiek zwierzat", protocol.animalAge);
    addRow("Rodzaj zwierzat", protocol.animalType);
    addRow("Ilosc zwierzat", protocol.animalCount);

    addSection("PREPARATY / SZCZEPIONKI");

    if (protocol.products?.length) {
        protocol.products.forEach((product, index) => {
            checkPage();

            pdf.setFontSize(11);
            pdf.text(`Preparat ${index + 1}`, 15, y);
            y += 7;

            addRow("Nr dokumentu", product.documentNumber);
            addRow("Nazwa", product.name);
            addRow("Seria", product.batch);
            addRow("Data waznosci", product.expiryDate);
            addRow("Ilosc", product.quantity);
            addRow("Dawkowanie / metoda", product.dosage);

            y += 4;
        });
    } else {
        addRow("-", "Brak");
    }

    addSection("BHP");
    addRow("Temperatura transportu", protocol.transportTemperature);
    addRow("Sprzet sterylny", yesNo(protocol.bhp?.sterileEquipment));
    addRow("Odziez ochronna", yesNo(protocol.bhp?.protectiveClothing));
    addRow("Odpady zabezpieczone", yesNo(protocol.bhp?.wasteSecured));
    addRow("Kombinezony spakowane", yesNo(protocol.bhp?.dirtyClothesPacked));

    addSection("PODPISY / OSOBY");
    addRow("Osoba nadzorujaca", protocol.supervisor);
    addRow("Hodowca / osoba upowazniona", protocol.authorizedPerson);
    addRow("Osoby wykonujace zabieg", protocol.workers);

    addSection("UWAGI");
    pdf.setFontSize(10);
    const notes = pdf.splitTextToSize(protocol.notes || "-", 180);
    pdf.text(notes, 15, y);

    window.open(pdf.output("bloburl"), "_blank");
};