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

    const addProduct = () => {
        setProducts((prev) => [...prev, { ...emptyProduct }]);
    };

    const removeProduct = (indexToRemove) => {
        setProducts((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    return (
        <Card>
            <Section>
                <SectionTitle>Dane zlecenia</SectionTitle>

                <Grid>
                    <Field>
                        <Label>Numer protokołu</Label>
                        <Input placeholder="np. 001/2026" />
                    </Field>

                    <Field>
                        <Label>📅 Data przyjęcia zlecenia</Label>
                        <Input type="date" />
                    </Field>

                    <Field>
                        <Label>🕒 Godzina przyjęcia</Label>
                        <Input type="time" />
                    </Field>

                    <Field>
                        <Label>Osoba zlecająca</Label>
                        <Input placeholder="np. Jan Kowalski" />
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
                        <Input type="date" defaultValue={getToday()} />
                    </Field>

                    <Field>
                        <Label>🕒 Godzina od</Label>
                        <Input type="time" />
                    </Field>

                    <Field>
                        <Label>🕒 Godzina do</Label>
                        <Input type="time" />
                    </Field>

                    <Field>
                        <Label>Przyczyna zmiany daty</Label>
                        <Input placeholder="opcjonalnie" />
                    </Field>
                </Grid>
            </Section>

            <Section>
                <SectionTitle>Dane hodowcy / fermy</SectionTitle>

                <Grid>
                    <Field>
                        <Label>Właściciel / ferma</Label>
                        <Input placeholder="np. Specjalistyczne Gospodarstwo Rolne..." />
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
                    <Textarea rows={4} placeholder="Dodatkowe informacje..." />
                </Field>
            </Section>

            <Section>
                <SectionTitle>Podpisy / osoby</SectionTitle>

                <Grid>
                    <Field>
                        <Label>Osoba nadzorująca</Label>
                        <Input placeholder="imię i nazwisko" />
                    </Field>

                    <Field>
                        <Label>Hodowca / osoba upoważniona</Label>
                        <Input placeholder="imię i nazwisko" />
                    </Field>

                    <Field>
                        <Label>Osoby wykonujące zabieg</Label>
                        <Input placeholder="np. Vitalii, Tomek, Kasia" />
                    </Field>
                </Grid>
            </Section>

            <ButtonsRow>
                <Button type="button">Zapisz protokół</Button>
            </ButtonsRow>
        </Card>
    );
};