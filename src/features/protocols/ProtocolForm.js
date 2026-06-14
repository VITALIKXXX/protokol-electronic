import { useState } from "react";
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

export const ProtocolForm = () => {
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
    });

    const [savedProtocol, setSavedProtocol] = useState(null);


    const updateField = (field) => (event) => {
        setFormData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const addProduct = () => {
        setProducts((prev) => [...prev, { ...emptyProduct }]);
    };

    const removeProduct = (indexToRemove) => {
        setProducts((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSave = () => {
        const protocol = {
            ...formData,
            products,
        };

        console.log(protocol);

        setSavedProtocol(protocol);
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
                    <CheckboxLabel><input type="checkbox" /> Szczepienie IM</CheckboxLabel>
                    <CheckboxLabel><input type="checkbox" /> Szczepienie SC</CheckboxLabel>
                    <CheckboxLabel><input type="checkbox" /> Błona skrzydłowa</CheckboxLabel>
                    <CheckboxLabel><input type="checkbox" /> Kropla do oka</CheckboxLabel>
                    <CheckboxLabel><input type="checkbox" /> Spray</CheckboxLabel>
                    <CheckboxLabel><input type="checkbox" /> Deratyzacja</CheckboxLabel>
                    <CheckboxLabel><input type="checkbox" /> Dezynfekcja</CheckboxLabel>
                    <CheckboxLabel><input type="checkbox" /> Dezynsekcja</CheckboxLabel>
                    <CheckboxLabel><input type="checkbox" /> Czyszczenie linii pojenia</CheckboxLabel>
                    <CheckboxLabel><input type="checkbox" /> Inne</CheckboxLabel>
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
                        <Input placeholder="np. Poznań" />
                    </Field>

                    <Field>
                        <Label>Budynek</Label>
                        <Input placeholder="np. Kurnik 1" />
                    </Field>

                    <Field>
                        <Label>Wiek zwierząt</Label>
                        <Input placeholder="np. 21 dni" />
                    </Field>

                    <Field>
                        <Label>Rodzaj zwierząt</Label>
                        <Input placeholder="np. brojlery" />
                    </Field>

                    <Field>
                        <Label>Ilość zwierząt</Label>
                        <Input type="number" placeholder="np. 25000" />
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
                                <Input placeholder="np. WZ/123/2026" />
                            </Field>

                            <Field>
                                <Label>Nazwa / opakowanie</Label>
                                <Input placeholder="np. Nobilis IB" />
                            </Field>

                            <Field>
                                <Label>Seria</Label>
                                <Input placeholder="np. AB1234" />
                            </Field>

                            <Field>
                                <Label>📅 Data ważności</Label>
                                <Input type="date" />
                            </Field>

                            <Field>
                                <Label>Ilość</Label>
                                <Input placeholder="np. 10 op." />
                            </Field>

                            <Field>
                                <Label>Dawkowanie / metoda zastosowania</Label>
                                <Input placeholder="np. w wodzie do picia" />
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
                        <Input placeholder="np. 2–8°C" />
                    </Field>
                </Grid>

                <CheckboxGrid>
                    <CheckboxLabel><input type="checkbox" /> Sprzęt sterylny</CheckboxLabel>
                    <CheckboxLabel><input type="checkbox" /> Odzież ochronna</CheckboxLabel>
                    <CheckboxLabel><input type="checkbox" /> Odpady zabezpieczone</CheckboxLabel>
                    <CheckboxLabel><input type="checkbox" /> Kombinezony spakowane</CheckboxLabel>
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
                    Zapisz protokół
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