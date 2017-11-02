```
import {DatePicker} from 'regular-component'
const datePicker2 = new DatePicker({
    data: {
        format: 'yyyy/MM/dd',
        onChange: (value)=>{
            alert(value)
        }
    }
})

datePicker2.$inject(this.refs.component2);
```
