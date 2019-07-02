<template>
    <div
        style="display: inline-block;margin-left: 10px">
        <el-button
            :loading="loading || btnLoading"
            :type="type"
            :icon="icon"
            @click="handleUpload">
            {{btnName}}
        </el-button>
        <input
            :id="id"
            class="import-excel-btn"
            type="file"
            accept=".xlsx, .xls"
            @change="handleFileChange">
    </div>
</template>

<script>
    import XLSX from 'xlsx';

    export default {
        name: 'import-excel',
        props: {
            btnName: {
                type: String,
                default: '导入'
            },
            btnLoading: {
                type: Boolean,
                default: false
            },
            id: {
                required: true,
                type: String
            },
            type: {
                type: String,
                default: 'primary'
            },
            icon: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                loading: false,
                excelData: {
                    header: null,
                    results: null
                }
            };
        },
        methods: {
            generateDate({ header, results }) {
                this.excelData.header = header;
                this.excelData.results = results;
                this.loading = false;
                this.$emit('on-selected-file', this.excelData);
                this.clearInputFile(document.getElementById(this.id));
            },
            handleUpload() {
                document.getElementById(this.id).click();
            },
            handleFileChange(e) {
                this.loading = true;
                const files = e.target.files;
                const itemFile = files[0]; // only use files[0]
                const ext = itemFile.name.substr(itemFile.name.lastIndexOf('.') + 1).toLowerCase();
                if (!['xlsx', 'xls'].includes(ext)) {
                    this.loading = false;
                    return this.$notify({
                        type: 'error',
                        title: this.$getLangMessage('error'),
                        message: this.$getLangMessage('excelError'),
                    });
                }
                const reader = new FileReader();
                reader.onload = e => {
                    const data = e.target.result;
                    const fixedData = this.fixdata(data);
                    const workbook = XLSX.read(btoa(fixedData), { type: 'base64' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const header = this.get_header_row(worksheet);
                    const results = XLSX.utils.sheet_to_json(worksheet);
                    this.generateDate({ header, results });
                };
                reader.readAsArrayBuffer(itemFile);
            },
            fixdata(data) {
                let o = '';
                let l = 0;
                const w = 10240;
                for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
            },
            get_header_row(sheet) {
                const headers = [];
                const range = XLSX.utils.decode_range(sheet['!ref']);
                let C;
                const R = range.s.r;
                /* start in the first row */
                for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
                    let cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
                    /* find the cell in the first row */
                    let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
                    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
                    headers.push(hdr);
                }
                return headers;
            },
            clearInputFile(f) {
                if (f.value) {
                    try {
                        f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
                    } catch (err) {
                    }

                    if (f.value) { //for IE5 ~ IE10
                        let form = document.createElement('form'), ref = f.nextSibling, p = f.parentNode;
                        form.appendChild(f);
                        form.reset();
                        p.insertBefore(f, ref);
                    }
                }
            }
        }
    };
</script>

<style scoped>
    .import-excel-btn {
        display: none;
        z-index: -9999;
    }
</style>
