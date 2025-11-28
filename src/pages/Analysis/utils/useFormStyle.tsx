import { createStyles } from 'antd-style';
const useFormStyle = createStyles(() => ({
  wrapper: {
    label: {
      display: 'none!important',
    },
    '.ant-pro-table-search-query-filter': {
      margin: '0!important',
    },
    '.ant-pro-query-filter': {
      padding: '0!important',
    },
    '.ant-pro-query-filter-row': {
      justifyContent: 'space-between!important',
      flexWrap: 'nowrap',
    },
    '.ant-pro-query-filter-row-split': {
      gap: '1rem',
      flex: '0 1 86%',
      'max-width': '86%',
    },
    '.ant-form-item-label': {
      width: '0px!important',
      'flex-basis': '0px!important',
    },
    '.ant-form-item-control': {
      'max-width': '100%!important',
    },
    '.ant-pro-query-filter-row-split + div': {
      'flex-item': 'end',
      'margin-left': 0,
      flex: '1 0 10%',
      'max-width': '20%',
    },
    '.ant-input-affix-wrapper': {
      backgroundColor: 'rgb(248, 250, 252)', // slate-50
      borderRadius: '0.5rem', // 8px - rounded-lg
      paddingLeft: '1rem', // 16px - px-4
      paddingRight: '1rem', // 16px - px-4
      paddingTop: '0.5rem', // 8px - py-2
      paddingBottom: '0.5rem', // 8px - py-2
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'rgb(226, 232, 240)', // slate-200
      display: 'flex',
      alignItems: 'center',
    },
    '.ant-btn-default': {
      'padding-top': '6px',
      padding: '0.5rem 1.5rem',
      background: '#fff',
      color: 'rgb(156, 163, 175)',
      'border-radius': '0.5rem',
      'font-size': '0.875rem',
      'line-height': '1.5rem',
      height: '40px!important',
      'font-weight': 500,
      'transition-property':
        'color, background- color, border- color, text- decoration - color, fill, stroke',
      'transition-timing-function': 'cubic - bezier(0.4, 0, 0.2, 1)',
      'transition-duration': '150ms',
    },
    '.ant-form-item-no-colon': {
      width: '0px!important',
    },
    '.ant-btn-default:hover': {
      color: '#111827!important',
      background: '#f3f4f6!important',
      'border-color': 'rgb(209, 213, 219) !important',
    },
    '.ant-btn-primary': {
      'padding-top': '6px',
      padding: '0.5rem 1.5rem',
      background: '#4f46e5',
      color: '#fff',
      height: '40px!important',
      'border-radius': '0.5rem',
      'font-size': '0.875rem',
      'line-height': '1.25rem',
      'font-weight': 500,
      'transition-property':
        'color, background- color, border- color, text- decoration - color, fill, stroke',
      'transition-timing-function': 'cubic - bezier(0.4, 0, 0.2, 1)',
      'transition-duration': '150ms',
    },
    '.ant-btn-primary:hover': {
      'background-color': 'rgb(67, 56, 202)!important',
    },
  },
}));

export default useFormStyle;
