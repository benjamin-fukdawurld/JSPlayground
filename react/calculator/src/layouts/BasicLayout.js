const BasicLayout = [
    [
        { label: '7' },
        { label: '8' },
        { label: '9' },
        { label: '', value: '/' },
        { label: '⎌', value: 'undo' },
        { label: 'C' }
    ],
    [
        { label: '4' },
        { label: '5' },
        { label: '6' },
        { label: '×', value: '*' },
        { label: '(' },
        { label: ')' }
    ],
    [
        { label: '1' },
        { label: '2' },
        { label: '3' },
        { label: '-' },
        {
            label: 'x²',
            value: '^2',
            buttonProps: { fontStyle: 'italic' }
        },
        { label: '√', value: 'sqrt' }
    ],
    [
        { label: '0' },
        { label: ',', value: '.' },
        { label: '%' },
        { label: '+' },
        {
            label: '=',
            value: '=',
            cellProps: { colSpan: '2' },
            buttonProps: {
                color: '#0C6D1A',
                hoverColor: '#1C7D2A'
            }
        }
    ]
];

export default BasicLayout;