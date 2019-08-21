/**
 * 获取字典某一项dKey对应的item的dValue值
 * @param dictionary
 * @param dictKey
 * @param dKey
 * @returns {*}
 * @example: getDictValue(dictionary, 'student_type', '2') // "委培"
 */
export const getDictValue = ( dictionary, dictKey, dKey ) => {
    if ( dictionary && dictionary[ dictKey ] ) {
     const item = dictionary[ dictKey ].find( v => v.dKey == dKey );
     return item ? item.dValue : dKey;
    }
    return dKey;
   };