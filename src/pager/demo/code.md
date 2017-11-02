```
import {Pager} from 'regular-component';
let pager = new Pager({
    data: {
        current: 1,
        total: 2,
        onChange: function(current){
            debugger;
        },
        
    }
})
pager.$inject(this.refs.component1);
```
