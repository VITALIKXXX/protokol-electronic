import { useState, useEffect } from "react";
import { createProtocol, updateProtocol } from "./protocolsApi";
import {
    Card,
    Section,
    SectionTitle,
    Grid,
    Field,
    Label,
    Input,
    Textarea,
    CheckboxGrid,
    CheckboxLabel,
    ProductBlock,
    Button,
    SecondaryButton,
    ButtonsRow,
} from "./ProtocolForm.styles";

const emptyProduct = {
    documentNumber: "",
    name: "",
    batch: "",
    expiryDate: "",
    quantity: "",
    dosage: "",
};

const getToday = () => new Date().toISOString().slice(0, 10);

export const ProtocolForm = ({ editingProtocol, onFinishEdit }) => {
    const [products, setProducts] = useState([{ ...emptyProduct }]);

    const [formData, setFormData] = useState({
        protocolNumber: "",
        orderDate: getToday(),
        orderTime: "",
        orderingPerson: "",
        executionDate: getToday(),
        startTime: "",
        endTime: "",
        breeder: "",
        city: "",
        building: "",
        animalAge: "",
        animalType: "",
        animalCount: "",
        notes: "",
        dateChangeReason: "",
        transportTemperature: "",
        supervisor: "",
        authorizedPerson: "",
        workers: "",
        treatments: [],
        bhp: {
            sterileEquipment: false,
            protectiveClothing: false,
            wasteSecured: false,
            dirtyClothesPacked: false,
        },
    });

    const [savedProtocol, setSavedProtocol] = useState(null);

    useEffect(() => {
        if (!editingProtocol) return;

        const { products: editedProducts = [], id, createdAt, createdAtMs, ...rest } = editingProtocol;

        setFormData((prev) => ({
            ...prev,
            ...rest,
            treatments: rest.treatments || [],
            bhp: rest.bhp || {
                sterileEquipment: false,
                protectiveClothing: false,
                wasteSecured: false,
                dirtyClothesPacked: false,
            },
        }));

        setProducts(editedProducts.length ? editedProducts : [{ ...emptyProduct }]);

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [editingProtocol]);


    const updateField = (field) => (event) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const toggleTreatment = (treatment) => (event) => {
        setFormData((prev) => {
            const checked = event.target.checked;

            return {
                ...prev,
                treatments: checked
                    ? [...prev.treatments, treatment]
                    : prev.treatments.filter((item) => item !== treatment),
            };
        });
    };

    const toggleBhp = (field) => (event) => {
        setFormData((prev) => ({
            ...prev,
            bhp: {
                ...prev.bhp,
                [field]: event.target.checked,
            },
        }));
    };

    const addProduct = () => {
        setProducts((prev) => [...prev, { ...emptyProduct }]);
    };

    const removeProduct = (indexToRemove) => {
        setProducts((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const updateProduct = (index, field) => (event) => {
        setProducts((prev) =>
            prev.map((product, productIndex) =>
                productIndex === index
                    ? {
                        ...product,
                        [field]: event.target.value,
                    }
                    : product
            )
        );
    };

    const handleSave = async () => {
        const protocol = {
            ...formData,
            products,
        };

        if (editingProtocol?.id) {
            await updateProtocol(editingProtocol.id, protocol);
            setSavedProtocol(protocol);
            onFinishEdit();
            alert("Protokół zaktualizowany ✅");
            return;
        }

        await createProtocol(protocol);
        setSavedProtocol(protocol);

        alert("Protokół zapisany w Firebase ✅");
    };

    return (
        <Card>
            <Section>
                <SectionTitle>Dane zlecenia</SectionTitle>

                <Grid>
                    <Field>
                        <Label>Numer protokołu</Label>
                        <Input
                            value={formData.protocolNumber}
                            onChange={updateField("protocolNumber")}
                            placeholder="np. 001/2026"
                        />
                    </Field>

                    <Field>
                        <Label>📅 Data przyjęcia zlecenia</Label>
                        <Input
                            type="date"
                            value={formData.orderDate}
                            onChange={updateField("orderDate")}
                        />
                    </Field>

                    <Field>
                        <Label>🕒 Godzina przyjęcia</Label>
                        <Input
                            type="time"
                            value={formData.orderTime}
                            onChange={updateField("orderTime")}
                        />
                    </Field>

                    <Field>
                        <Label>Osoba zlecająca</Label>
                        <Input
                            value={formData.orderingPerson}
                            onChange={updateField("orderingPerson")}
                            placeholder="np. Jan Kowalski"
                        />
                    </Field>
                </Grid>
            </Section>

            <Section>
                <SectionTitle>Rodzaj zabiegu</SectionTitle>

                <CheckboxGrid>
                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={formData.treatments.includes("Szczepienie IM")}
                            onChange={toggleTreatment("Szczepienie IM")}
                        />
                        Szczepienie IM
                    </CheckboxLabel>
                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={formData.treatments.includes("Szczepienie SC")}
                            onChange={toggleTreatment("Szczepienie SC")}
                        />
                        Szczepienie SC
                    </CheckboxLabel>
                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={formData.treatments.includes("Błona skrzydłowa")}
                            onChange={toggleTreatment("Błona skrzydłowa")}
                        />
                        Błona skrzydłowa
                    </CheckboxLabel>
                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={formData.treatments.includes("Kropla do oka")}
                            onChange={toggleTreatment("Kropla do oka")}
                        />
                        Kropla do oka
                    </CheckboxLabel>
                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={formData.treatments.includes("Spray")}
                            onChange={toggleTreatment("Spray")}
                        />
                        Spray
                    </CheckboxLabel>
                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={formData.treatments.includes("Deratyzacja")}
                            onChange={toggleTreatment("Deratyzacja")}
                        />
                        Deratyzacja
                    </CheckboxLabel>
                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={formData.treatments.includes("Dezynfekcja")}
                            onChange={toggleTreatment("Dezynfekcja")}
                        />
                        Dezynfekcja
                    </CheckboxLabel>
                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={formData.treatments.includes("Dezynsekcja")}
                            onChange={toggleTreatment("Dezynsekcja")}
                        />
                        Dezynsekcja
                    </CheckboxLabel>
                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={formData.treatments.includes("Czyszczenie linii pojenia")}
                            onChange={toggleTreatment("Czyszczenie linii pojenia")}
                        />
                        Czyszczenie linii pojenia
                    </CheckboxLabel>
                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={formData.treatments.includes("Inne")}
                            onChange={toggleTreatment("Inne")}
                        />
                        Inne
                    </CheckboxLabel>
                </CheckboxGrid>
            </Section>

            <Section>
                <SectionTitle>Wykonanie zabiegu</SectionTitle>

                <Grid>
                    <Field>
                        <Label>📅 Data wykonania</Label>
                        <Input
                            type="date"
                            value={formData.executionDate}
                            onChange={updateField("executionDate")}
                        />
                    </Field>

                    <Field>
                        <Label>🕒 Godzina od</Label>
                        <Input
                            type="time"
                            value={formData.startTime}
                            onChange={updateField("startTime")}
                        />
                    </Field>

                    <Field>
                        <Label>🕒 Godzina do</Label>
                        <Input
                            type="time"
                            value={formData.endTime}
                            onChange={updateField("endTime")}
                        />
                    </Field>

                    <Field>
                        <Label>Przyczyna zmiany daty</Label>
                        <Input
                            value={formData.dateChangeReason}
                            onChange={updateField("dateChangeReason")}
                            placeholder="opcjonalnie"
                        />
                    </Field>
                </Grid>
            </Section>

            <Section>
                <SectionTitle>Dane hodowcy / fermy</SectionTitle>

                <Grid>
                    <Field>
                        <Label>Właściciel / ferma</Label>
                        <Input
                            value={formData.breeder}
                            onChange={updateField("breeder")}
                            placeholder="np. Specjalistyczne Gospodarstwo Rolne..."
                        />
                    </Field>

                    <Field>
                        <Label>Miejscowość</Label>
                        <Input
                            value={formData.city}
                            onChange={updateField("city")}
                            placeholder="np. Poznań"
                        />
                    </Field>

                    <Field>
                        <Label>Budynek</Label>
                        <Input
                            value={formData.building}
                            onChange={updateField("building")}
                            placeholder="np. Kurnik 1"
                        />
                    </Field>

                    <Field>
                        <Label>Wiek zwierząt</Label>
                        <Input
                            value={formData.animalAge}
                            onChange={updateField("animalAge")}
                            placeholder="np. 21 dni"
                        />
                    </Field>

                    <Field>
                        <Label>Rodzaj zwierząt</Label>
                        <Input
                            value={formData.animalType}
                            onChange={updateField("animalType")}
                            placeholder="np. brojlery"
                        />
                    </Field>

                    <Field>
                        <Label>Ilość zwierząt</Label>
                        <Input
                            type="number"
                            value={formData.animalCount}
                            onChange={updateField("animalCount")}
                            placeholder="np. 25000"
                        />
                    </Field>
                </Grid>
            </Section>

            <Section>
                <SectionTitle>Preparaty / szczepionki</SectionTitle>

                {products.map((product, index) => (
                    <ProductBlock key={index}>
                        <SectionTitle>Preparat {index + 1}</SectionTitle>

                        <Grid>
                            <Field>
                                <Label>Nr dokumentu wydania</Label>
                                <Input
                                    value={product.documentNumber}
                                    onChange={updateProduct(index, "documentNumber")}
                                    placeholder="np. WZ/123/2026"
                                />
                            </Field>

                            <Field>
                                <Label>Nazwa / opakowanie</Label>
                                <Input
                                    value={product.name}
                                    onChange={updateProduct(index, "name")}
                                    placeholder="np. Nobilis IB"
                                />
                            </Field>

                            <Field>
                                <Label>Seria</Label>
                                <Input
                                    value={product.batch}
                                    onChange={updateProduct(index, "batch")}
                                    placeholder="np. AB1234"
                                />
                            </Field>

                            <Field>
                                <Label>📅 Data ważności</Label>
                                <Input
                                    type="date"
                                    value={product.expiryDate}
                                    onChange={updateProduct(index, "expiryDate")}
                                />
                            </Field>

                            <Field>
                                <Label>Ilość</Label>
                                <Input
                                    value={product.quantity}
                                    onChange={updateProduct(index, "quantity")}
                                    placeholder="np. 10 op."
                                />
                            </Field>

                            <Field>
                                <Label>Dawkowanie / metoda zastosowania</Label>
                                <Input
                                    value={product.dosage}
                                    onChange={updateProduct(index, "dosage")}
                                    placeholder="np. w wodzie do picia"
                                />
                            </Field>
                        </Grid>

                        {products.length > 1 && (
                            <SecondaryButton type="button" onClick={() => removeProduct(index)}>
                                Usuń preparat
                            </SecondaryButton>
                        )}
                    </ProductBlock>
                ))}

                <SecondaryButton type="button" onClick={addProduct}>
                    + Dodaj preparat
                </SecondaryButton>
            </Section>

            <Section>
                <SectionTitle>BHP i uwagi</SectionTitle>

                <Grid>
                    <Field>
                        <Label>Temperatura transportu</Label>
                        <Input
                            value={formData.transportTemperature}
                            onChange={updateField("transportTemperature")}
                            placeholder="np. 2–8°C"
                        />
                    </Field>
                </Grid>

                <CheckboxGrid>
                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={formData.bhp.sterileEquipment}
                            onChange={toggleBhp("sterileEquipment")}
                        />
                        Sprzęt sterylny
                    </CheckboxLabel>
                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={formData.bhp.protectiveClothing}
                            onChange={toggleBhp("protectiveClothing")}
                        />
                        Odzież ochronna
                    </CheckboxLabel>

                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={formData.bhp.wasteSecured}
                            onChange={toggleBhp("wasteSecured")}
                        />
                        Odpady zabezpieczone
                    </CheckboxLabel>

                    <CheckboxLabel>
                        <input
                            type="checkbox"
                            checked={formData.bhp.dirtyClothesPacked}
                            onChange={toggleBhp("dirtyClothesPacked")}
                        />
                        Kombinezony spakowane
                    </CheckboxLabel>
                </CheckboxGrid>

                <Field>
                    <Label>Uwagi</Label>
                    <Textarea
                        rows={4}
                        value={formData.notes}
                        onChange={updateField("notes")}
                        placeholder="Dodatkowe informacje..."
                    />
                </Field>
            </Section>

            <Section>
                <SectionTitle>Podpisy / osoby</SectionTitle>

                <Grid>
                    <Field>
                        <Label>Osoba nadzorująca</Label>
                        <Input
                            value={formData.supervisor}
                            onChange={updateField("supervisor")}
                            placeholder="imię i nazwisko"
                        />
                    </Field>

                    <Field>
                        <Label>Hodowca / osoba upoważniona</Label>
                        <Input
                            value={formData.authorizedPerson}
                            onChange={updateField("authorizedPerson")}
                            placeholder="imię i nazwisko"
                        />
                    </Field>

                    <Field>
                        <Label>Osoby wykonujące zabieg</Label>
                        <Input
                            value={formData.workers}
                            onChange={updateField("workers")}
                            placeholder="np. Vitalii, Tomek, Kasia"
                        />
                    </Field>
                </Grid>
            </Section>

            <ButtonsRow>
                <Button type="button" onClick={handleSave}>
                    {editingProtocol ? "Zapisz zmiany" : "Zapisz protokół"}
                </Button>
            </ButtonsRow>

            {savedProtocol && (
                <Section>
                    <SectionTitle>Ostatnio zapisany protokół</SectionTitle>

                    <p>
                        <strong>Numer:</strong> {savedProtocol.protocolNumber || "-"}
                    </p>

                    <p>
                        <strong>Osoba zlecająca:</strong>{" "}
                        {savedProtocol.orderingPerson || "-"}
                    </p>

                    <p>
                        <strong>Data przyjęcia:</strong>{" "}
                        {savedProtocol.orderDate || "-"}
                    </p>
                </Section>
            )}
        </Card>
    );
};