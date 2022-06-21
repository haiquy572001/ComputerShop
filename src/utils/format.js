export const formatMoney = (number) => {
  return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`;
};

export const checkType = (product_type, product) => {
  switch (product_type) {
    case "Mainboard":
      return {
        back_panel: product.detail_infor.back_panel,
        chipset: product.detail_infor.chipset,
        cpu_support: product.detail_infor.cpu_support,
        mainboard_form: product.detail_infor.mainboard_form,
        maximun_ram_slot: product.detail_infor.maximun_ram_slot,
        name_mainboard: product.detail_infor.name_mainboard,
        ram_type: product.detail_infor.name_mainboard,
        socket: product.detail_infor.socket,
      };
    case "RAM":
      return {
        capacity: product.detail_infor.capacity,
        model: product.detail_infor.model,
        name_ram: product.detail_infor.name_ram,
        quantity_in_pack: product.detail_infor.quantity_in_pack,
        ram_type: product.detail_infor.ram_type,
        rbg: product.detail_infor.rbg ? "YES" : "NO",
        speed: product.detail_infor.speed,
      };
    case "CPU":
      return {
        cache_cpu: product.detail_infor.cache_cpu,
        cpu_generation: product.detail_infor.cpu_generation,
        cpu_series: product.detail_infor.cpu_series,
        cpu_type: product.detail_infor.cpu_type,
        name_cpu: product.detail_infor.name_cpu,
        number_of_core: product.detail_infor.number_of_core,
        number_of_threads: product.detail_infor.number_of_threads,
        processing_speed: product.detail_infor.processing_speed,
        socket: product.detail_infor.socket,
        tdp: product.detail_infor.tdp,
      };
    case "VGA":
      return {
        capacity: product.detail_infor.capacity,
        gaming_mode: product.detail_infor.gaming_mode,
        gpu: product.detail_infor.gpu,
        memory_bus: product.detail_infor.memory_bus,
        name_vga: product.detail_infor.name_vga,
        number_of_processing_units:
          product.detail_infor.number_of_processing_units,
        oc_mode: product.detail_infor.oc_mode,
        radiators: product.detail_infor.radiators,
      };
    case "Hard_Drive":
      return {
        capacity: product.detail_infor.capacity,
        connection_standard: product.detail_infor.connection_standard ?? "No",
        name_hard_drive: product.detail_infor.name_hard_drive,
        read_speed: product.detail_infor.read_speed,
        ssd: product.detail_infor.ssd ? "Yes" : "No",
        write_speed: product.detail_infor.write_speed,
      };
    case "PSU":
      return {
        cooling_fan_size: product.detail_infor.cooling_fan_size,
        name_psu: product.detail_infor.name_psu,
        psu_input_power: product.detail_infor.psu_input_power,
        psu_performance: product.detail_infor.psu_performance,
        psu_wattage: product.detail_infor.psu_wattage,
      };
    case "CASE_Cover":
      return {
        case_type: product.detail_infor.case_type,
        color: product.detail_infor.color,
        material: product.detail_infor.material,
        name_case_cover: product.detail_infor.name_case_cover,
        rgb: product.detail_infor.rgb ? "Yes" : "No",
        size: product.detail_infor.size,
      };
    case "Radiator":
      return {
        Speed: product.detail_infor.Speed,
        heatsink: product.detail_infor.heatsink,
        name_radiator: product.detail_infor.name_radiator,
        rgb: product.detail_infor.rgb ? "Yes" : "No",
        socket_support: product.detail_infor.socket_support.join(", "),
        size: product.detail_infor.size,
        wattage: product.detail_infor.wattage ? "YES" : "NO",
      };
    default:
      break;
  }
};

export const totalAmount = (products) => {
  let total = 0;
  products.forEach((item) => {
    total += Number(item.product.price * item.number_product);
  });
  return formatMoney(total);
};
