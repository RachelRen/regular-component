AssociatedInput
联动输入
---

## 如何使用
- 联动选择，可以方便用户选择
- 模糊匹配从数据库中选择数据


## API

<table>
    <tr>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>默认值</th>
    </tr>
    <tr>
        <td>dataSource</td>
        <td>自动完成的数据源</td>
        <td>[]</td>
        <td></td>
    </tr>
    <tr>
        <td>onChange</td>
        <td>input 的 value 变化时，调用此函数</td>
        <td>function(value)</td>
        <td>-</td>
    </tr>
    <tr>
        <td>onSelect</td>
        <td>被选中时调用，参数为选中项的 value 值</td>
        <td>string</td>
        <td>-</td>
    </tr>
</table>
