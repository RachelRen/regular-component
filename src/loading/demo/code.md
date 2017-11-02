```
import {Loading} from 'regular-component';
const loading = new Loading({
    data: {
        state: 'loading',//[loading | complete | error]
        error: {
            msg: '',
            code: ''
        }
    }
})
loading.$inject(this.refs.component1);
```
