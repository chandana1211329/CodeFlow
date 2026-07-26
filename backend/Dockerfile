FROM alpine:latest

WORKDIR /app

# Install execution runtimes for C, Java, Python execution
RUN apk add --no-cache gcc musl-dev openjdk17 python3 py3-pip

# Copy pre-compiled Go binary into the container
COPY server /app/server

# Ensure execution permission
RUN chmod +x /app/server

EXPOSE 8080

CMD ["/app/server"]
