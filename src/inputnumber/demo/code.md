```
import {InputNumber} from 'regular-component';
let inputNumber = new InputNumber({
    data: {
        value: 2,
        showHandler: true,//false
        max: 100,
        isPositive: false,
        hasDecimal: true,
        class: "",
        maxLength: 23,
        defaultValue: "3",
        onChange: (value) =>{
            //
        }
    }
});
inputNumber.$inject(this.refs.component1);
```
