```
import {DatePicker} from 'regular-component'
const datePicker = new DatePicker({
    data: {
        mode: 'month',
        onChange: (value)=>{
            alert(value)
        }
    }
})

datePicker.$inject(this.refs.component1);
```
