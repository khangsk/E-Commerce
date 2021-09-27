import { useEffect } from "react";
import useLocationForm from "./useLocationForm";
import Select from "react-select";

const LocationForm: React.FC<{
  cityHandler: (x: string) => void;
  districtHandler: (x: string) => void;
  wardHandler: (x: string) => void;
}> = (props) => {
  const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } =
    useLocationForm(false);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  useEffect(() => {
    if (selectedCity) props.cityHandler(selectedCity);
    if (selectedDistrict) props.districtHandler(selectedDistrict);
    if (selectedWard) props.wardHandler(selectedWard);
  }, [selectedCity, selectedDistrict, selectedWard, props]);

  return (
    <form
      onSubmit={onSubmit}
      // style={{}}
    >
      <div style={{ width: "30%" }}>
        <Select
          name="cityId"
          key={Math.random()}
          isDisabled={cityOptions.length === 0}
          options={cityOptions}
          onChange={(option) => onCitySelect(option)}
          placeholder="Tỉnh/Thành"
          defaultValue={selectedCity}
        />
      </div>
      <div style={{ width: "30%", margin: "16px 0" }}>
        <Select
          name="districtId"
          key={Math.random()}
          isDisabled={districtOptions.length === 0}
          options={districtOptions}
          onChange={(option) => onDistrictSelect(option)}
          placeholder="Quận/Huyện"
          defaultValue={selectedDistrict}
        />
      </div>
      <div style={{ width: "30%" }}>
        <Select
          name="wardId"
          key={Math.random()}
          isDisabled={wardOptions.length === 0}
          options={wardOptions}
          placeholder="Phường/Xã"
          onChange={(option) => onWardSelect(option)}
          defaultValue={selectedWard}
        />
      </div>
    </form>
  );
};

export default LocationForm;
