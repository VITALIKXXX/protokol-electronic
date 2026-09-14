import {
    useEffect,
    useState,
} from "react";

import {
    createProductPreset,
    removeProductPreset,
    subscribeProductPresets,
    updateProductPreset,
} from "./productsApi";

import {
    ManagerCard,
    ManagerHeader,
    ManagerTitle,
    ManagerSubtitle,
    Form,
    FormGrid,
    Field,
    Label,
    Input,
    Select,
    FormActions,
    PrimaryButton,
    SecondaryButton,
    Divider,
    ProductList,
    ProductCard,
    ProductTop,
    ProductName,
    ProductDetails,
    DetailRow,
    DetailLabel,
    ProductActions,
    EditButton,
    DeleteButton,
    EmptyMessage,
} from "./ProductPresetsManager.styles";


const emptyForm = {
    name: "",
    batch: "",
    expiryDate: "",
    dosage: "Spray",
};


export const ProductPresetsManager =
    () => {

        const [
            products,
            setProducts,
        ] = useState([]);

        const [
            formData,
            setFormData,
        ] = useState(
            emptyForm
        );

        const [
            editingId,
            setEditingId,
        ] = useState(null);


        useEffect(() => {

            const unsubscribe =
                subscribeProductPresets(
                    setProducts
                );

            return () => {
                unsubscribe();
            };

        }, []);


        const updateField =
            (field) => (event) => {

                setFormData((prev) => ({
                    ...prev,
                    [field]:
                        event.target.value,
                }));
            };


        const resetForm = () => {

            setFormData(
                emptyForm
            );

            setEditingId(null);
        };


        const handleSubmit =
            async (event) => {

                event.preventDefault();


                if (
                    !formData.name.trim()
                ) {

                    alert(
                        "Wpisz nazwę preparatu."
                    );

                    return;
                }


                const product = {
                    name:
                        formData.name.trim(),

                    batch:
                        formData.batch.trim(),

                    expiryDate:
                        formData.expiryDate,

                    dosage:
                        formData.dosage,
                };


                try {

                    if (editingId) {

                        await updateProductPreset(
                            editingId,
                            product
                        );

                        alert(
                            "Preparat zaktualizowany ✅"
                        );

                    } else {

                        await createProductPreset(
                            product
                        );

                        alert(
                            "Preparat dodany ✅"
                        );
                    }


                    resetForm();

                } catch (error) {

                    console.error(
                        "Błąd zapisu preparatu:",
                        error
                    );

                    alert(
                        "Nie udało się zapisać preparatu."
                    );
                }
            };


        const handleEdit =
            (product) => {

                setEditingId(
                    product.id
                );

                setFormData({
                    name:
                        product.name || "",

                    batch:
                        product.batch || "",

                    expiryDate:
                        product.expiryDate || "",

                    dosage:
                        product.dosage || "Spray",
                });


                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            };


        const handleDelete =
            async (product) => {

                const confirmed =
                    window.confirm(
                        `Usunąć preparat "${product.name}"?`
                    );


                if (!confirmed) {
                    return;
                }


                try {

                    await removeProductPreset(
                        product.id
                    );

                } catch (error) {

                    console.error(
                        "Błąd usuwania preparatu:",
                        error
                    );

                    alert(
                        "Nie udało się usunąć preparatu."
                    );
                }
            };


        return (
            <ManagerCard>

                <ManagerHeader>
                    <ManagerTitle>
                        🧪 Baza preparatów
                    </ManagerTitle>

                    <ManagerSubtitle>
                        Dodawaj i aktualizuj preparaty,
                        serie oraz daty ważności.
                    </ManagerSubtitle>
                </ManagerHeader>


                <Form
                    onSubmit={
                        handleSubmit
                    }
                >

                    <FormGrid>

                        <Field>
                            <Label>
                                Nazwa preparatu
                            </Label>

                            <Input
                                value={
                                    formData.name
                                }
                                onChange={
                                    updateField(
                                        "name"
                                    )
                                }
                                placeholder="np. Nobilis ND Clone 30"
                            />
                        </Field>


                        <Field>
                            <Label>
                                Seria
                            </Label>

                            <Input
                                value={
                                    formData.batch
                                }
                                onChange={
                                    updateField(
                                        "batch"
                                    )
                                }
                                placeholder="np. SA837AA12"
                            />
                        </Field>


                        <Field>
                            <Label>
                                📅 Data ważności
                            </Label>

                            <Input
                                type="date"
                                value={
                                    formData.expiryDate
                                }
                                onChange={
                                    updateField(
                                        "expiryDate"
                                    )
                                }
                            />
                        </Field>


                        <Field>
                            <Label>
                                Metoda zastosowania
                            </Label>

                            <Select
                                value={
                                    formData.dosage
                                }
                                onChange={
                                    updateField(
                                        "dosage"
                                    )
                                }
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

                            </Select>
                        </Field>

                    </FormGrid>


                    <FormActions>

                        <PrimaryButton
                            type="submit"
                        >
                            {
                                editingId
                                    ? "💾 Zapisz zmiany"
                                    : "➕ Dodaj preparat"
                            }
                        </PrimaryButton>


                        {
                            editingId && (

                                <SecondaryButton
                                    type="button"
                                    onClick={
                                        resetForm
                                    }
                                >
                                    Anuluj edycję
                                </SecondaryButton>

                            )
                        }

                    </FormActions>

                </Form>


                <Divider />


                {
                    products.length === 0
                        ? (
                            <EmptyMessage>
                                Brak preparatów w bazie.
                            </EmptyMessage>
                        )
                        : (

                            <ProductList>

                                {
                                    products.map(
                                        (product) => (

                                            <ProductCard
                                                key={
                                                    product.id
                                                }
                                            >

                                                <ProductTop>

                                                    <div>

                                                        <ProductName>
                                                            {
                                                                product.name
                                                            }
                                                        </ProductName>


                                                        <ProductDetails>

                                                            <DetailRow>

                                                                <DetailLabel>
                                                                    Seria:
                                                                </DetailLabel>

                                                                <span>
                                                                    {
                                                                        product.batch ||
                                                                        "-"
                                                                    }
                                                                </span>

                                                            </DetailRow>


                                                            <DetailRow>

                                                                <DetailLabel>
                                                                    Ważność:
                                                                </DetailLabel>

                                                                <span>
                                                                    {
                                                                        product.expiryDate ||
                                                                        "-"
                                                                    }
                                                                </span>

                                                            </DetailRow>


                                                            <DetailRow>

                                                                <DetailLabel>
                                                                    Metoda:
                                                                </DetailLabel>

                                                                <span>
                                                                    {
                                                                        product.dosage ||
                                                                        "-"
                                                                    }
                                                                </span>

                                                            </DetailRow>

                                                        </ProductDetails>

                                                    </div>


                                                    <ProductActions>

                                                        <EditButton
                                                            type="button"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            ✏️ Edytuj
                                                        </EditButton>


                                                        <DeleteButton
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            🗑 Usuń
                                                        </DeleteButton>

                                                    </ProductActions>

                                                </ProductTop>

                                            </ProductCard>

                                        )
                                    )
                                }

                            </ProductList>

                        )
                }

            </ManagerCard>
        );
    };