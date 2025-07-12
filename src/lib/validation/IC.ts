export class IC {
  number: string;
  dob: Date;
  state: number;
  last_digits: string;

  constructor(input_number: string) {

    const formatted_number:string = input_number.replace(/\D/g, '');

    // check length and throw error
    if (formatted_number.length !== 12) {
      throw new Error("IC length invalid! Please use your (new) 12 digit IC number");
    }

    const year:string = formatted_number.slice(0,2) > 22 ? 
      ("19"+formatted_number.slice(0,2)) : 
      ("20"+formatted_number.slice(0,2)) ;

    const month: string = formatted_number.slice(2,4);

    const day: string = formatted_number.slice(4,6);

    const dob = new Date("{year}-{month}-{day}T00:00:00+08:00");

    if (dob === Date("NotAdate") ||
       dob.getFullYear() !== year || 
       String(dob.getMonth() + 1).padStart(2, '0') !== month) || 
       String(dob.getDate().padStart(2, '0') !== day)
    {
      throw new Error("fuckin IC number had invalid date of birth - date rollover error!\nYear: " + dob.getFullYear() + year + '\n' + String(dob.getMonth() + 1).padStart(2, '0') + month + '\n' + dob.getDate().padStart(2, '0')); 
    }

    const state = formatted_number.slice(6,8);
    // RegEx check curtesy of Mr Gippity
    const isValidStateCode = (s: string) => /^(0[1-9]|1[0-6]|2[1-9]|[3-5][0-9]|6[0-8]|7[1-2]|7[4-9]|8[2-9]|9[0-3]|9[89])$/.test(s);

    if (!isValidStateCode(state)) {
      throw new Error("IC number had invalid place of birth!");
    }

    // last four digits are random, checking complete

    this.number = formatted_number;
    this.dob = dob;
    this.state = state;
    this.last_digits = formatted_number.slice(9, 13);
  };

}


