```
import {Select} from 'regular-component';
let select = new Select({
    data: {
        value: '1',
        class: 'selectClass',
        list: [{
            value: '',
            text: "rerer"
        },{
            value: 1,
            text: "text"
        },{
            value: 2,
            text: "text 2"
        }],
        onChange: function(value){
            debugger;
        }
    }
})
select.$inject(this.refs.component1);
```
