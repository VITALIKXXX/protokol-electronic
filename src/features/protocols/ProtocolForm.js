import { useState, useEffect } from "react";
import { SignaturePad } from "./SignaturePad";
import {
    subscribeProductPresets,
} from "./productsApi";

import {
    createProtocol,
    updateProtocol,
    generateTemporaryProtocolNumber,
    finalizeProtocolNumber,
} from "./protocolsApi";

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
    presetId: "",
    isCustom: false,
    name: "",
    batch: "",
    expiryDate: "",
    quantity: "",
    dosage: "Spray",
};


const getToday = () =>
    new Date().toISOString().slice(0, 10);


export const ProtocolForm = ({
    editingProtocol,
    onFinishEdit,
    currentUser,
    currentUserData,
}) => {

    const [products, setProducts] = useState([
        { ...emptyProduct },
    ]);

    const [
        productPresets,
        setProductPresets,
    ] = useState([]);

    useEffect(() => {

        const unsubscribe =
            subscribeProductPresets(
                setProductPresets
            );

        return () => {
            unsubscribe();
        };

    }, []);

    const [formData, setFormData] = useState({

        protocolNumber:
            generateTemporaryProtocolNumber(),

        orderDate: getToday(),

        orderTime: "",

        orderingPerson: "",

        executionDate: getToday(),

        startTime: "",

        endTime: "",
        breeder: "",

        building: "",

        animalAge: "",

        animalType: "",

        animalCount: "",

        notes: "",

        transportTemperature: "2-8°C",

        workers: [""],

        treatments: [],

        farmerSignature: "",

        workerSignature: "",

        bhp: {

            sterileEquipment: true,

            protectiveClothing: true,

            wasteSecured: true,

            dirtyClothesPacked: true,
        },
    });


    const [savedProtocol, setSavedProtocol] =
        useState(null);


    // =====================================================
    // RESET FORMULARZA
    //
    // WAŻNE:
    // Ta funkcja NIE komunikuje się z Firebase.
    //
    // Dzięki temu działa natychmiast również offline.
    // =====================================================

    const resetForm = () => {

        setFormData({

            protocolNumber:
                generateTemporaryProtocolNumber(),

            orderDate: getToday(),

            orderTime: "",

            orderingPerson: "",

            executionDate: getToday(),

            startTime: "",

            endTime: "",

            breeder: "",

            building: "",

            animalAge: "",

            animalType: "",

            animalCount: "",

            notes: "",

            transportTemperature: "2-8°C",

            workers: [""],

            treatments: [],

            farmerSignature: "",

            workerSignature: "",

            bhp: {

                sterileEquipment: true,

                protectiveClothing: true,

                wasteSecured: true,

                dirtyClothesPacked: true,
            },
        });


        setProducts([
            { ...emptyProduct },
        ]);
    };


    // =====================================================
    // EDYCJA PROTOKOŁU
    // =====================================================

    useEffect(() => {

        if (editingProtocol) {

            const {

                products: editedProducts = [],

                id,

                createdAt,

                createdAtMs,

                updatedAtMs,

                ...rest

            } = editingProtocol;


            const normalizedWorkers =
                Array.isArray(rest.workers)

                    ? rest.workers

                    : String(rest.workers || "")

                        .split(",")

                        .map((worker) =>
                            worker.trim()
                        )

                        .filter(Boolean);


            setFormData((prev) => ({

                ...prev,

                ...rest,

                workers:
                    normalizedWorkers.length

                        ? normalizedWorkers

                        : [""],

                treatments:
                    rest.treatments || [],

                bhp:
                    rest.bhp || {

                        sterileEquipment: true,

                        protectiveClothing: true,

                        wasteSecured: true,

                        dirtyClothesPacked: true,
                    },
            }));


            setProducts(

                editedProducts.length

                    ? editedProducts

                    : [{ ...emptyProduct }]
            );


            window.scrollTo({

                top: 0,

                behavior: "smooth",
            });


            return;
        }


        // Jeśli nie edytujemy starego protokołu,
        // upewniamy się, że formularz ma numer TEMP.

        setFormData((prev) => ({

            ...prev,

            protocolNumber:
                prev.protocolNumber ||
                generateTemporaryProtocolNumber(),
        }));

    }, [editingProtocol]);


    // =====================================================
    // POLA FORMULARZA
    // =====================================================

    const updateField =
        (field) => (event) => {

            setFormData((prev) => ({

                ...prev,

                [field]: event.target.value,
            }));
        };


    // =====================================================
    // RODZAJE ZABIEGÓW
    // =====================================================

    const toggleTreatment =
        (treatment) => (event) => {

            setFormData((prev) => {

                const checked =
                    event.target.checked;


                return {

                    ...prev,

                    treatments: checked

                        ? [
                            ...prev.treatments,
                            treatment,
                        ]

                        : prev.treatments.filter(
                            (item) =>
                                item !== treatment
                        ),
                };
            });
        };


    // =====================================================
    // BHP
    // =====================================================

    const toggleBhp =
        (field) => (event) => {

            setFormData((prev) => ({

                ...prev,

                bhp: {

                    ...prev.bhp,

                    [field]:
                        event.target.checked,
                },
            }));
        };


    // =====================================================
    // PREPARATY
    // =====================================================

    const addProduct = () => {

        setProducts((prev) => [

            ...prev,

            { ...emptyProduct },
        ]);
    };


    const removeProduct =
        (indexToRemove) => {

            setProducts((prev) =>

                prev.filter(
                    (_, index) =>
                        index !== indexToRemove
                )
            );
        };


    const updateProduct =
        (index, field) => (event) => {

            setProducts((prev) =>

                prev.map(
                    (
                        product,
                        productIndex
                    ) =>

                        productIndex === index

                            ? {

                                ...product,

                                [field]:
                                    event.target.value,
                            }

                            : product
                )
            );
        };

    const selectProductPreset =
        (index) => (event) => {

            const selectedValue =
                event.target.value;


            // ==========================
            // INNY PREPARAT
            // ==========================

            if (
                selectedValue ===
                "__custom__"
            ) {

                setProducts((prev) =>
                    prev.map(
                        (
                            product,
                            productIndex
                        ) =>

                            productIndex === index

                                ? {
                                    ...product,

                                    presetId: "",

                                    isCustom:
                                        true,

                                    name: "",

                                    batch: "",

                                    expiryDate: "",

                                    dosage:
                                        "Spray",
                                }

                                : product
                    )
                );

                return;
            }


            // ==========================
            // PREPARAT Z FIREBASE
            // ==========================

            const preset =
                productPresets.find(
                    (product) =>
                        product.id ===
                        selectedValue
                );


            if (!preset) {
                return;
            }


            setProducts((prev) =>
                prev.map(
                    (
                        product,
                        productIndex
                    ) =>

                        productIndex === index

                            ? {
                                ...product,

                                presetId:
                                    preset.id,

                                isCustom:
                                    false,

                                name:
                                    preset.name ||
                                    "",

                                batch:
                                    preset.batch ||
                                    "",

                                expiryDate:
                                    preset.expiryDate ||
                                    "",

                                dosage:
                                    preset.dosage ||
                                    "Spray",
                            }

                            : product
                )
            );
        };
    // =====================================================
    // KTO UTWORZYŁ / EDYTOWAŁ PROTOKÓŁ
    // =====================================================

    const getCurrentActor = () => ({

        uid:
            currentUser?.uid || "",

        email:
            currentUser?.email || "",

        name:

            currentUserData?.displayName ||

            currentUser?.email?.split("@")[0] ||

            "Pracownik",
    });


    // =====================================================
    // ZAPIS PROTOKOŁU
    // =====================================================

    const handleSave = async () => {

        try {

            const actor =
                getCurrentActor();


            const protocol = {

                ...formData,

                products,
            };


            // =================================================
            // EDYCJA ISTNIEJĄCEGO PROTOKOŁU
            // =================================================

            if (editingProtocol?.id) {

                const updateData = {

                    ...protocol,

                    updatedBy: actor,
                };


                if (navigator.onLine) {

                    await updateProtocol(
                        editingProtocol.id,
                        updateData
                    );

                } else {

                    // Firestore zapisze zmianę lokalnie.
                    // Po odzyskaniu internetu ją zsynchronizuje.

                    updateProtocol(
                        editingProtocol.id,
                        updateData
                    ).catch((error) => {

                        console.error(
                            "Błąd synchronizacji edytowanego protokołu:",
                            error
                        );
                    });
                }


                setSavedProtocol(protocol);


                onFinishEdit();


                // Czyścimy formularz natychmiast.
                resetForm();


                alert(

                    navigator.onLine

                        ? "Protokół zaktualizowany ✅"

                        : "Zmiany zapisane offline ✅ Zostaną zsynchronizowane po odzyskaniu internetu."
                );


                return;
            }


            // =================================================
            // NOWY PROTOKÓŁ
            // =================================================

            const protocolToSave = {

                ...protocol,

                createdBy: actor,

                updatedBy: actor,
            };


            // =================================================
            // OFFLINE
            // =================================================

            if (!navigator.onLine) {

                /*
                    Nie robimy tutaj await.

                    Firestore zapisuje dokument
                    do lokalnej kolejki.

                    Kiedy internet wróci,
                    dokument zostanie wysłany
                    automatycznie.
                */

                createProtocol(
                    protocolToSave
                ).catch((error) => {

                    console.error(
                        "Błąd synchronizacji protokołu offline:",
                        error
                    );
                });


                setSavedProtocol(protocol);


                // FORMULARZ CZYŚCI SIĘ OD RAZU
                resetForm();


                alert(

                    "Protokół zapisany offline ✅\n\n" +

                    "Finalny numer zostanie nadany automatycznie po odzyskaniu internetu."
                );


                return;
            }


            // =================================================
            // ONLINE
            // =================================================

            const protocolId =
                await createProtocol(
                    protocolToSave
                );


            setSavedProtocol(protocol);


            // Czyścimy formularz.
            resetForm();


            /*
                Teraz nadajemy właściwy numer:

                np.

                TEMP-1908-170520-X4P2

                ↓

                047/2026

                Robimy to przez transakcję Firestore.
            */

            finalizeProtocolNumber(
                protocolId
            ).catch((error) => {

                console.error(
                    "Nie udało się nadać finalnego numeru protokołu:",
                    error
                );
            });


            alert(
                "Protokół zapisany ✅"
            );


        } catch (error) {

            console.error(
                "Błąd zapisu protokołu:",
                error
            );


            alert(

                `Nie udało się zapisać protokołu: ${error.message ||
                "nieznany błąd"
                }`
            );
        }
    };


    // =====================================================
    // PODPIS HODOWCY
    // =====================================================

    const saveFarmerSignature =
        (signatureImage) => {

            setFormData((prev) => ({

                ...prev,

                farmerSignature:
                    signatureImage,
            }));
        };


    // =====================================================
    // PODPIS TECHNIKA
    // =====================================================

    const saveWorkerSignature =
        (signatureImage) => {

            setFormData((prev) => ({

                ...prev,

                workerSignature:
                    signatureImage,
            }));
        };


    // =====================================================
    // OSOBY WYKONUJĄCE ZABIEG
    // =====================================================

    const addWorker = () => {

        setFormData((prev) => ({

            ...prev,

            workers: [

                ...prev.workers,

                "",
            ],
        }));
    };


    const updateWorker =
        (index) => (event) => {

            setFormData((prev) => ({

                ...prev,

                workers:
                    prev.workers.map(
                        (
                            worker,
                            workerIndex
                        ) =>

                            workerIndex === index

                                ? event.target.value

                                : worker
                    ),
            }));
        };


    const removeWorker =
        (indexToRemove) => {

            setFormData((prev) => ({

                ...prev,

                workers:
                    prev.workers.filter(
                        (_, index) =>
                            index !==
                            indexToRemove
                    ),
            }));
        };


    // =====================================================
    // OD TEGO MIEJSCA ZOSTAWIASZ SWÓJ OBECNY JSX
    // =====================================================

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
                                <Label>
                                    Preparat / szczepionka
                                </Label>

                                <Input
                                    as="select"
                                    value={
                                        product.isCustom
                                            ? "__custom__"
                                            : product.presetId
                                    }
                                    onChange={
                                        selectProductPreset(
                                            index
                                        )
                                    }
                                >
                                    <option value="">
                                        -- wybierz preparat --
                                    </option>

                                    {productPresets.map(
                                        (preset) => (
                                            <option
                                                key={
                                                    preset.id
                                                }
                                                value={
                                                    preset.id
                                                }
                                            >
                                                {preset.name}
                                                {" — seria: "}
                                                {preset.batch || "brak"}
                                                {" — ważność: "}
                                                {preset.expiryDate || "brak"}
                                            </option>
                                        )
                                    )}

                                    <option
                                        value="__custom__"
                                    >
                                        ✏️ Inny — wpisz ręcznie
                                    </option>
                                </Input>
                            </Field>

                            {product.isCustom && (
                                <Field>
                                    <Label>
                                        Nazwa preparatu
                                    </Label>

                                    <Input
                                        value={
                                            product.name
                                        }
                                        onChange={
                                            updateProduct(
                                                index,
                                                "name"
                                            )
                                        }
                                        placeholder="Wpisz nazwę preparatu"
                                    />
                                </Field>
                            )}

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
                                <Label>
                                    Dawkowanie / metoda zastosowania
                                </Label>

                                <Input
                                    as="select"
                                    value={product.dosage}
                                    onChange={updateProduct(
                                        index,
                                        "dosage"
                                    )}
                                >
                                    <option value="Spray">
                                        Spray
                                    </option>

                                    <option value="Woda">
                                        Woda
                                    </option>

                                    <option value="Kropla do oka">
                                        Kropla do oka
                                    </option>

                                    <option value="Iniekcja IM">
                                        Iniekcja IM
                                    </option>

                                    <option value="Iniekcja SC">
                                        Iniekcja SC
                                    </option>

                                    <option value="Błona skrzydłowa">
                                        Błona skrzydłowa
                                    </option>

                                    <option value="Inne">
                                        Inne
                                    </option>
                                </Input>
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
                <SignaturePad
                    title="Podpis hodowcy lub osoby upoważnionej"
                    value={formData.farmerSignature}
                    onSave={saveFarmerSignature}
                />


                <br />

                <SignaturePad
                    title="Podpis technika"
                    value={formData.workerSignature}
                    onSave={saveWorkerSignature}
                />

                {formData.signature && (
                    <p>Podpis zapisany ✅</p>
                )}

                <Grid>

                    <Field>
                        <Label>Osoby wykonujące zabieg</Label>
                        {formData.workers.map((worker, index) => (
                            <div key={index}>
                                <Input
                                    value={worker}
                                    onChange={updateWorker(index)}
                                    placeholder={`Osoba ${index + 1}`}
                                />

                                {formData.workers.length > 1 && (
                                    <SecondaryButton
                                        type="button"
                                        onClick={() => removeWorker(index)}
                                    >
                                        Usuń osobę
                                    </SecondaryButton>
                                )}
                            </div>
                        ))}

                        <SecondaryButton type="button" onClick={addWorker}>
                            + Dodaj kolejną osobę
                        </SecondaryButton>
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