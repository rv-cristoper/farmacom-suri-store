import { useState } from "react";
import SelectMenu from "../../components/select-menu";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Button from "../../components/ui/button";
import { UnitOfMeasurement } from "../../enums/unitOfMeasurement.enum";
import ProductController from "../../controllers/product-controller";

interface IProps {
    getProducts: () => void
}

export default function CreateProductModal(props: IProps) {
    const { getProducts } = props
    const [inputs, setInputs] = useState<Record<string, string>>({
        name: "",
        location: "",
        unitOfMeasurement: "",
        units: "",
        packageOrBox: "",
        blisters: "",
    })
    const handleChange = (value: string, name: string) => {
        setInputs({ ...inputs, [name]: value })
    }
    const handleSubmit = () => {
        const data: Record<string, string | number> = {
            name: inputs.name,
            location: inputs.location,
            unitOfMeasurement: inputs.unitOfMeasurement,
        }
        if (inputs.unitOfMeasurement === UnitOfMeasurement.UNITS) data.units = 1
        if (inputs.unitOfMeasurement === UnitOfMeasurement.UNITS_PER_PACKAGE_OR_BOX || inputs.unitOfMeasurement === UnitOfMeasurement.UNITS_PER_BLISTER_PER_BOX) {
            data.packageOrBox = 1
            data.units = +inputs.units
            if (inputs.unitOfMeasurement === UnitOfMeasurement.UNITS_PER_BLISTER_PER_BOX) data.blisters = +inputs.blisters
        }
        ProductController.create({ data, getProducts })
    }

    return (
        <div>
            <p>Crear producto</p>
            <div>
                <div>
                    <Label>Nombre</Label>
                    <Input
                        type="text"
                        name="name"
                        value={inputs.name}
                        onChange={({ target: { value, name } }) => handleChange(value, name)}
                    />
                </div>
                <div>
                    <Label>Ubicación</Label>
                    <Input
                        type="text"
                        name="location"
                        value={inputs.location}
                        onChange={({ target: { value, name } }) => handleChange(value, name)}
                    />
                </div>
                <div>
                    <Label>Tipo de medida</Label>
                    <SelectMenu
                        name="unitOfMeasurement"
                        defaultValue={inputs.unitOfMeasurement}
                        handleChange={handleChange}
                        options={[
                            { value: "units", label: "Unidad" },
                            { value: "unitsPerPackageOrBox", label: "Unidades por Paquete/Caja" },
                            { value: "unitsPerBlisterPerBox", label: "Unidades por Blisters por Caja" }
                        ]}
                    />
                </div>
                {
                    (inputs.unitOfMeasurement === UnitOfMeasurement.UNITS_PER_PACKAGE_OR_BOX || inputs.unitOfMeasurement === UnitOfMeasurement.UNITS_PER_BLISTER_PER_BOX) &&
                    <>
                        <div>
                            <Label>
                                {
                                    inputs.unitOfMeasurement === UnitOfMeasurement.UNITS_PER_BLISTER_PER_BOX ? "Cantidad de Blisters por Caja"
                                        : "Cantidad de unidades por Paquete/Caja"
                                }
                            </Label>
                            <Input
                                type="text"
                                name={inputs.unitOfMeasurement === UnitOfMeasurement.UNITS_PER_BLISTER_PER_BOX ? "blisters" : "units"}
                                value={inputs[inputs.unitOfMeasurement === UnitOfMeasurement.UNITS_PER_BLISTER_PER_BOX ? "blisters" : "units"]}
                                onChange={({ target: { value, name } }) => handleChange(value.replace(/\D/g, ''), name)}
                            />
                        </div>
                        {
                            inputs.unitOfMeasurement === UnitOfMeasurement.UNITS_PER_BLISTER_PER_BOX &&
                            <div>
                                <Label>Cantidad de unidades por Blister</Label>
                                <Input
                                    type="text"
                                    name="units"
                                    value={inputs.units}
                                    onChange={({ target: { value, name } }) => handleChange(value.replace(/\D/g, ''), name)}
                                />
                            </div>
                        }
                    </>
                }
                <Button onClick={handleSubmit}>Crear Producto</Button>
            </div>
        </div>
    )
}