```
const tree3 = new Tree({
    data: {
        multiple: true,
        service: (()=>{
            return (id, callback) => {
                callback(loadList(id))
            }
        })(),
        selectItemCallback: function(json){
            debugger;
        },
        onCheck: function(json){
            debugger;
        }
    }
})
tree3.$inject(this.refs.component2);
```
