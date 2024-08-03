const binarySearch = (arr, id) => {
    let low = 0;
    let high = arr.length-1;

    while ( low<=high ) {

        let mid = Math.floor((low+high)/2);

        if (arr[mid]._id == id) {
            return arr[mid];
        }
        else if (arr[mid]._id < id) {
            low = mid+1;
        }
        else {
            high = mid-1;
        }
    }

    // if the id is not found
    return null;
}

export default binarySearch